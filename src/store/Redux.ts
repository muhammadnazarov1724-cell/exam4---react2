import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/token";
import { da } from "zod/locales";

type Category = {
    id: number;
    categoryName: string
    subCategories: {
        id: number,
        subCategoryName: string
    }[]
}

export type Product = {
    id: number,
    productName: string,
    image: string,
    price: number,
    hasDiscount: boolean;
    discountPrice: number;
}

let initialState = {
    data: [] as Category[],
    loading: false,
    error: '',
    openCategoryId: null as number | null,
    activeSlide: 0,
    products: [] as Product[],
    productsLoading: false,
    productsError: '',
    showAllCategories: false,
    productsPage: 1,
    hasMoreProducts: false,
    productsRequestId: '',
    minPrice: '',
    maxPrice: '',
    priceError: '',
    saleTime: 0,
}

export const getCategories = createAsyncThunk('data/getCategories',
    async function () {
        const { data } = await axiosRequest.get('/Category/get-categories')
        return data.data as Category[]
    }
)

export const getProducts = createAsyncThunk(
  'data/getProducts',
  async function (info: {
    categoryId?: number;
    subCategoryId?: number;
    pageNumber?: number;
    minPrice?: number;
    maxPrice?: number;
    discountOnly?: boolean;
  }) {

    if (info.discountOnly) {
        const discountProducts: Product[] = []
        let page = 1
        let totalPage = 1

        do {
            const {data, status} = await axiosRequest.get('/Product/get-products', {
                params: {
                    CategoryId: info.categoryId,
                    subCategotyId: info.subCategoryId,
                    MinPrice: info.minPrice,
                    MaxPrice: info.maxPrice,
                    pageNumber: page,
                    PageSize: 100,
                },
            })
            if (status === 204) break

            const items = data.data.products as Product[]

            discountProducts.push(...items.filter((product) => product.hasDiscount))

            totalPage = data.totalPage
            page++
        } while (page <= totalPage)

            return {
                products: discountProducts,
                pageNumber: 1,
                hasMore: false
            }
    }

    const pageNumber = info.pageNumber || 1

    const {data, status} = await axiosRequest.get('/Product/get-products', {
      params: {
        CategoryId: info.categoryId,
        SubcategoryId: info.subCategoryId,
        PageNumber: pageNumber,
        PageSize: 9,
        MinPrice: info.minPrice,
        MaxPrice: info.maxPrice,
      },
    })

    if (status === 204) {
      return {
        products: [] as Product[],
        pageNumber,
        hasMore: false,
      }
    }

    return {
      products: data.data.products as Product[],
      pageNumber,
      hasMore: pageNumber < data.totalPage,
    }
  }
)

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setActiveSlide(state, action: PayloadAction<number>) {
            state.activeSlide = action.payload
        },
        toggleCategory(state, action: PayloadAction<number>) {
            state.openCategoryId = state.openCategoryId === action.payload ? null : action.payload
        },
        toggleCategoriesList(state) {
            state.showAllCategories = !state.showAllCategories
        },
        setMinPrice(state, action: PayloadAction<string>) { 
         state.minPrice = action.payload
         state.priceError = ''
        },
        setMaxPrice(state, action: PayloadAction<string>) { 
  state.maxPrice = action.payload
  state.priceError = ''
        },
        setPriceError(state, action: PayloadAction<string>) {
          state.priceError = action.payload
        },
        setSaleTime(state, action: PayloadAction<number>) {
            state.saleTime = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.loading = true
            state.error = ''
        })
        .addCase(getCategories.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        .addCase(getCategories.rejected, (state) => {
        state.loading = false
        state.error = 'Не удалось загрузить категории'
       })
.addCase(getProducts.pending, (state, action) => {
  state.productsLoading = true
  state.productsError = ''
  state.productsRequestId = action.meta.requestId

  if (!action.meta.arg.pageNumber || action.meta.arg.pageNumber === 1) {
    state.products = []
    state.productsPage = 1
    state.hasMoreProducts = false
  }
})
.addCase(getProducts.fulfilled, (state, action) => {
  if (state.productsRequestId !== action.meta.requestId) return

  state.productsLoading = false
  state.productsPage = action.payload.pageNumber
  state.hasMoreProducts = action.payload.hasMore

  if (action.payload.pageNumber === 1) {
    state.products = action.payload.products
  } else {
    state.products.push(...action.payload.products)
  }
})
.addCase(getProducts.rejected, (state, action) => {
  if (state.productsRequestId !== action.meta.requestId) return

  state.productsLoading = false
  state.productsError = 'Не удалось загрузить товары'
})
    }
})


export default dataSlice.reducer

export const { toggleCategory, setActiveSlide, toggleCategoriesList, setMinPrice, setMaxPrice, setPriceError, setSaleTime} = dataSlice.actions

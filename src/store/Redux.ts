import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/token";

type Category = {
    id: number;
    categoryName: string
    categoryImage: string
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

export type ProductDetails = {
    id: number;
    productName: string;
    description: string;
    brand: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
    hasDiscount: boolean;
    discountPrice: number;
    images: {
        id: number;
        images: string
    }[];
}

function getSaveWishlist(): Product[] {
    try {
        const saved = JSON.parse(localStorage.getItem('wishlist') || '[]')
        return Array.isArray(saved) ? saved : []
    } catch (error) {
        return[]
    }
}

let initialState = {
    data: [] as Category[],
    loading: false,
    error: '',
    openCategoryId: null as number | null,
    activeSlide: 0,
    accountMenuOpen: false,
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
    ourProducts: [] as Product[],
    ourProductsLoading: false,
    ourProductsError: '',
    wishlist: getSaveWishlist(),   
    productDetails: null as ProductDetails | null,
    detailsLoading: false,
    detailsError: '',
    detailsRequestId: '',
    detailsImageIndex: 0,
    detailsQuantity: 1,
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
    productsName?: string
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
                    SubcategoryId: info.subCategoryId,
                    MinPrice: info.minPrice,
                    MaxPrice: info.maxPrice,
                    pageNumber: page,
                    PageSize: 100,
                    ProductName: info.productsName,
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
        ProductName: info.productsName
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

export const getOurProducts = createAsyncThunk('data/getOurProducts', 
    async function() {
        const {data, status} = await axiosRequest.get('/Product/get-products', {
            params: {
                pageNumber: 1,
                pageSize: 8
            },
        })

        if (status === 204) {
            return [] as Product[]
        }

        return data.data.products as Product[]
    }
)

export const getProductById = createAsyncThunk('data/getProductById',
    async function (id: number) {
        const {data, status} = await axiosRequest.get('/Product/get-product-by-id',
            {    
                params: {id}
            }
        ) 
        if (status === 204 || !data.data) {
          throw new Error('Товар не найден')
        }
        return data.data as ProductDetails
    }
)

export const getCart = createAsyncThunk('data/getCart', 
    async function () {
        const {data} = await axiosRequest.get('/Cart/get-products-from-cart')

        return data
    }
)

export const addToCart = createAsyncThunk('data/addToCart',
    async function (id: number, {dispatch}) {
        await axiosRequest.post('/Cart/add-product-to-cart', null,
            {
                params: {id}
            }
        )
        await dispatch(getCart()).unwrap()
    }
)

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setAccountMenuOpen(state, action: PayloadAction<boolean>) {
            state.accountMenuOpen = action.payload
        },
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
        },
        // Для добавлении в Wishlist
        toggleWishlist(state, action: PayloadAction<Product>) {
            const exists = state.wishlist.some(
                (product) => product.id === action.payload.id
            )
            if (exists) {
                state.wishlist = state.wishlist.filter(
                    (product) => product.id !== action.payload.id
                )
            }
            else {
                state.wishlist.push(action.payload)
            }
        },
        // Для удалении из Wishlist
        removeFromWishlist(state, action: PayloadAction<number>) {
            state.wishlist = state.wishlist.filter(
                (product) => product.id !== action.payload
            )
        },
        // Для картинки Details
        setDetailsImageIndex(state, action: PayloadAction<number>) {
            state.detailsImageIndex = action.payload
        },
        // Для того чтобы сделать +
        changeDetailsQuaintity(state, action: PayloadAction<number>) {
            state.detailsQuantity = Math.max(1, state.detailsQuantity + action.payload)
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
        .addCase(getOurProducts.pending, (state) => {
          state.ourProductsLoading = true
          state.ourProductsError = ''
        })
        .addCase(getOurProducts.fulfilled, (state, action) => {
          state.ourProductsLoading = false
          state.ourProducts = action.payload
        })
        .addCase(getOurProducts.rejected, (state) => {
          state.ourProductsLoading = false
          state.ourProductsError = 'Не удалось загрузить товары'
        })
        .addCase(getProductById.pending, (state, action) => {
          state.detailsLoading = true
          state.detailsError = ''
          state.productDetails = null
          state.detailsImageIndex = 0
          state.detailsRequestId = action.meta.requestId
          state.detailsQuantity = 1
        })
        .addCase(getProductById.fulfilled, (state, action) => {
          if (state.detailsRequestId !== action.meta.requestId) return

          state.detailsLoading = false
          state.productDetails = action.payload
        })
        .addCase(getProductById.rejected, (state, action) => {
          if (state.detailsRequestId !== action.meta.requestId) return

          state.detailsLoading = false
          state.detailsError = action.error.message || 'Не удалось загрузить товар'
        })
        }
})


export default dataSlice.reducer

export const { toggleCategory, setActiveSlide, toggleCategoriesList, setMinPrice, setMaxPrice, setPriceError, setSaleTime, setAccountMenuOpen, toggleWishlist, removeFromWishlist, setDetailsImageIndex, changeDetailsQuaintity} = dataSlice.actions

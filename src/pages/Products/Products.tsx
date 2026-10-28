import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { NavLink, useSearchParams } from 'react-router-dom'
import { getProducts } from '../../store/Redux'
import ProductCard from './ProductCard'
import ProductsFilters from './ProductsFilters'

export default function Products() {

    const dispatch = useDispatch<AppDispatch>()
    const [searchParams] = useSearchParams()

    const categoryId = Number(searchParams.get('categoryId')) || undefined
    const subCategoryId = Number(searchParams.get('subCategoryId')) || undefined

    const minPrice = searchParams.has('minPrice') ? Number(searchParams.get('minPrice')) : undefined

    const maxPrice = searchParams.has('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined

    const {products, productsLoading, productsError, productsPage, hasMoreProducts} = useSelector(
        (state: RootState) => state.data
    )

    useEffect(() => {
        dispatch(getProducts({categoryId, subCategoryId, minPrice, maxPrice, pageNumber: 1,}))
    },[dispatch, categoryId, subCategoryId, minPrice, maxPrice])

  return (
    <main className="mx-auto w-full max-w-[1170px] px-6 pt-12 pb-20 sm:pt-14 sm:pb-24">
        <h1 className="sr-only">Explore Our Products</h1>

        <div className="mb-9 flex flex-wrap items-center justify-between gap-5 lg:mb-10">
            <nav className="flex items-center gap-3 text-xs" aria-label="Breadcrumb">
                <NavLink className="text-[#888] transition-colors hover:text-brand" to="/">Home</NavLink>
                <span className="text-[#999]" aria-hidden="true">/</span>
                <span>Explore Our Products</span>
            </nav>

            <label>
                <span className="sr-only">Sort products</span>
                <select className="h-11 w-[190px] cursor-pointer rounded border border-[#d5d5d5] bg-white px-4 text-xs outline-none transition-colors focus:border-brand" defaultValue="popular">
                    <option value="popular">Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                </select>
            </label>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <ProductsFilters />

            <section className="min-w-0 flex-1" aria-label="Products" aria-busy={productsLoading}>
                {productsLoading && products.length === 0 && (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 min-[540px]:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Загрузка товаров">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div className="animate-pulse" key={item} aria-hidden="true">
                                <div className="aspect-[1.08] rounded bg-[#f5f5f5]" />
                                <div className="mt-4 h-3 w-3/4 rounded bg-[#eee]" />
                                <div className="mt-3 h-3 w-1/2 rounded bg-[#f2f2f2]" />
                            </div>
                        ))}
                    </div>
                )}

                {productsError && (
                    <p className="rounded border border-[#f1caca] bg-[#fff8f8] px-6 py-8 text-center text-sm text-brand" role="alert">{productsError}</p>
                )}

                {!productsLoading && !productsError && products.length === 0 && (
                    <div className="rounded border border-dashed border-[#ddd] bg-[#fafafa] px-6 py-20 text-center">
                        <p className="text-lg font-medium">В этой категории пока нет товаров</p>
                        <NavLink className="mt-4 inline-block border-b border-brand pb-1 text-sm text-brand" to="/">Вернуться к категориям</NavLink>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-x-6 gap-y-8 min-[540px]:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                {hasMoreProducts && (
                <div className="mt-12 flex justify-center">
                  <button
                    className="cursor-pointer rounded bg-brand px-10 py-3.5 text-sm text-white transition-colors hover:bg-[#c93636] disabled:cursor-wait disabled:opacity-60"
                    type="button"
                    disabled={productsLoading}
                    onClick={() => dispatch(getProducts({
                      categoryId,
                      minPrice,
                      maxPrice,
                      subCategoryId,
                      pageNumber: productsPage + 1,
                   }))}
                  >
                    {productsLoading ? 'Loading...' : 'More Products'}
                  </button>
                </div>
              )}
            </section>
        </div>
    </main>
  )
}

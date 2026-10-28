import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { NavLink } from 'react-router-dom'
import ProductCard from '../Products/ProductCard'

export default function BestForSell() {
  const {products, productsLoading, productsError} = useSelector(
    (state: RootState) => state.data
  )

  const shownProducts = products
    .filter((product) => product.hasDiscount)
    .slice(4, 8)

  return (
    <section className="mt-14 pb-14">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-9 w-4 rounded bg-brand" />
        <p className="text-sm font-medium text-brand">This Month</p>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Best Selling Products
        </h2>

        <NavLink
          to="/products?discountOnly=true"
          className="rounded bg-brand px-8 py-3 text-sm text-white transition-colors hover:bg-[#c93636]"
        >
          View All
        </NavLink>
      </div>

      {productsLoading && (
        <p className="py-8 text-sm text-[#777]">
          Загрузка товаров...
        </p>
      )}

      {productsError && (
        <p className="py-8 text-brand">{productsError}</p>
      )}

      {!productsLoading && !productsError && (
        <>
          {shownProducts.length === 0 && (
            <p className="py-8 text-sm text-[#777]">
              Товаров со скидкой пока нет
            </p>
          )}

          <div className="grid grid-cols-1 gap-6 min-[540px]:grid-cols-2 lg:grid-cols-4">
            {shownProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
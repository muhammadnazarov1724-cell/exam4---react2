import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { getOurProducts } from '../../store/Redux'
import { NavLink } from 'react-router-dom'
import ProductCard from '../Products/ProductCard'

const outlineButtonClass =
  'cursor-pointer rounded border border-[#aaa] px-7 py-3 text-sm font-medium transition-colors hover:border-brand hover:text-brand'

export default function Wishlist() {
  const dispatch = useDispatch<AppDispatch>()

  const {
    wishlist,
    ourProducts,
    ourProductsLoading,
    ourProductsError,
  } = useSelector((state: RootState) => state.data)

  useEffect(() => {
    dispatch(getOurProducts())
  }, [dispatch])

  const recommendations = ourProducts
    .filter((product) =>
      !wishlist.some((item) => item.id === product.id)
    )
    .slice(0, 4)

  return (
    <main className="mx-auto min-h-[750px] w-full max-w-[1170px] px-6 py-14">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
        <h1 className="text-xl">
          Wishlist ({wishlist.length})
        </h1>

        <button type="button" className={outlineButtonClass}>
          Move All To Bag
        </button>
      </div>

      {wishlist.length === 0 && (
        <div className="rounded border border-dashed border-[#ddd] py-16 text-center">
          <p className="text-[#777]">В избранном пока нет товаров</p>
          <NavLink to="/products" className="mt-4 inline-block text-brand underline">
            Перейти в каталог
          </NavLink>
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-6 gap-y-9 min-[540px]:grid-cols-2 lg:grid-cols-4">
        {wishlist.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            wishlistPage
          />
        ))}
      </div>

      <section className="mt-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="flex items-center gap-3 text-xl">
            <span className="h-9 w-4 rounded bg-brand" />
            Just For You
          </h2>

          <NavLink to="/products" className={outlineButtonClass}>
            See All
          </NavLink>
        </div>

        {ourProductsLoading && <p>Загрузка товаров...</p>}
        {ourProductsError && (
          <p className="text-brand">{ourProductsError}</p>
        )}

        <div className="grid grid-cols-1 gap-x-6 gap-y-9 min-[540px]:grid-cols-2 lg:grid-cols-4">
          {recommendations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}
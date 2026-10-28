import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from '../../store/store'
import { useEffect } from "react"
import { getCategories, getProducts, setSaleTime, toggleCategory } from "../../store/Redux"
import HeroSlider from '../../components/HeroSlider'
import { NavLink } from "react-router-dom"
import ProductCard from "../Products/ProductCard"
import Section3H from "./Section3H"
import BestForSell from "./BestForSell"
import Kalonka from "./Kalonka"
import OurProduct from "./ourProduct"
import NewArrival from "./NewArrival"


export default function Home() {

  const dispatch = useDispatch<AppDispatch>()

  const {data, loading, error, openCategoryId, products, productsLoading, productsError, saleTime} = useSelector(
    (state: RootState) => state.data
  )

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts({discountOnly: true}))
  },[dispatch])

  useEffect(() => {
    const deadline = new Date('2026-10-30T20:00:00+05:00').getTime()

    function updateTimer() {
      const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000))
      dispatch(setSaleTime(seconds))

      return seconds
    }
    if (updateTimer() === 0) return

    const timer = setInterval(() => {
      if(updateTimer() === 0) {
        clearInterval(timer)
      }
    },1000)
    return () => clearInterval(timer)
  }, [dispatch])

  const days = Math.floor(saleTime / 86400)
  const hours = Math.floor((saleTime % 86400) / 3600)
  const minutes = Math.floor((saleTime % 3600) / 60)
  const seconds = saleTime % 60

  const timerItems = [
    {label: 'Days', value: days},
    {label: 'Hours', value: hours},
    {label: 'Minutes', value: minutes},
    {label: 'Seconds', value: seconds},
  ]

  const flashProducts = products.filter((product) => product.hasDiscount).slice(0,4)

  return (
<main className="mx-auto w-full max-w-[1170px] px-6 py-10">
  <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-stretch">      <aside id="home-categories" className="w-full lg:w-60 lg:shrink-0 lg:border-r lg:border-[#e5e5e5] lg:pr-6">
        {loading && <p>Загрузка категорий...</p>}

        {error && (
          <div>
            <p className="text-brand">{error}</p>
            <button type="button" onClick={() => dispatch(getCategories())}>
              Попробовать ещё раз
            </button>
          </div>
        )}

        <ul className="flex flex-col gap-1">
        {data.map((category) => (
          <li key={category.id}>
            <div className="flex items-center justify-between gap-4 py-2 text-sm">
              <NavLink
                className="flex-1 hover:text-brand"
                to={`/products?categoryId=${category.id}`}
              >
                {category.categoryName}
              </NavLink>

              {category.subCategories.length > 0 && (
                <button
                  type="button"
                  className="cursor-pointer px-2"
                  onClick={() => dispatch(toggleCategory(category.id))}
                  aria-expanded={openCategoryId === category.id}
                >
                  {openCategoryId === category.id ? '⌄' : '›'}
                </button>
              )}
            </div>

            {openCategoryId === category.id && (
              <ul className="mb-3 ml-2 border-l border-[#ddd] pl-4">
                {category.subCategories.map((subCategory) => (
                  <li
                    key={subCategory.id}
                    className="py-2 text-sm text-[#666]"
                  >
                    <NavLink
                     to={`/products?categoryId=${category.id}&subCategoryId=${subCategory.id}`}
                   >
                     {subCategory.subCategoryName}
                   </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      </aside>
      <HeroSlider />
      </div>

    <section className="mt-16 border-b border-[#e5e5e5] pb-14">
    <div className="mb-5 flex items-center gap-3">
      <span className="h-9 w-4 rounded bg-brand" />
      <p className="text-sm font-medium text-brand">Today’s</p>
    </div>

  <div className="mb-7 flex flex-wrap items-end gap-6 sm:gap-16">
  <h2 className="text-3xl font-semibold">Flash Sales</h2>

  <div className="flex items-end gap-3 sm:gap-4" role="timer">
    {timerItems.map((item, index) => (
      <div
        key={item.label}
        className="flex items-end gap-3 sm:gap-4"
      >
        <div>
          <p className="mb-1 text-xs">{item.label}</p>

          <p className="text-3xl font-bold tabular-nums">
            {String(item.value).padStart(2, '0')}
          </p>
        </div>

        {index < timerItems.length - 1 && (
          <span className="pb-1 text-2xl text-brand">:</span>
        )}
      </div>
    ))}
  </div>
</div>

    {productsLoading && (
      <p className="py-10 text-sm text-[#777]">Загрузка товаров...</p>
    )}

    {productsError && (
      <p className="py-10 text-brand">{productsError}</p>
    )}

    {!productsLoading && !productsError && flashProducts.length === 0 && (
      <p className="py-10 text-sm text-[#777]">
        Товаров со скидкой пока нет
      </p>
    )}

    <div className="grid grid-cols-1 gap-6 min-[540px]:grid-cols-2 lg:grid-cols-4">
      {flashProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>

    <div className="mt-9 flex justify-center">
      <NavLink
        to="/products?discountOnly=true"
        className="rounded bg-brand px-10 py-3.5 text-sm text-white transition-colors hover:bg-[#c93636]"
      >
        View All Products
      </NavLink>
    </div>
  </section>
  <Section3H/>
  <BestForSell/>
  <Kalonka/>
  <OurProduct/>
  <NewArrival/>
    </main>
  )
}

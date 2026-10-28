import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from '../../store/store'
import { useEffect } from "react"
import { getCategories, toggleCategory } from "../../store/Redux"
import HeroSlider from '../../components/HeroSlider'
import { NavLink } from "react-router-dom"

export default function Home() {

  const dispatch = useDispatch<AppDispatch>()

  const {data, loading, error, openCategoryId} = useSelector(
    (state: RootState) => state.data
  )

  useEffect(() => {
    dispatch(getCategories())
  },[dispatch])

  return (
 <main className="mx-auto flex w-full max-w-[1170px] flex-col items-start gap-8 px-6 py-10 lg:flex-row lg:items-stretch">
      <aside id="home-categories" className="w-full lg:w-60 lg:shrink-0 lg:border-r lg:border-[#e5e5e5] lg:pr-6">
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
    </main>
  )
}

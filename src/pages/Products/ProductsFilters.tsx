import { useEffect, type ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { getCategories, setMaxPrice, setMinPrice, setPriceError, toggleCategoriesList } from '../../store/Redux'
import { useSearchParams } from 'react-router-dom'

const brands = ['Samsung', 'Apple', 'Huawei', 'Poco', 'Lenovo']
const features = ['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory']
const conditions = ['Any', 'Refurbished', 'Brand new', 'Old items']
const checkboxClass = 'size-3.5 shrink-0 cursor-pointer rounded border-[#ccc] accent-[#db4444]'

function FilterSection({title, children}: {title: string; children: ReactNode}) {


  return (
    <details className="group border-t border-[#e5e7eb] py-3.5" open>
      <summary className="flex cursor-pointer list-none items-center justify-between text-[13px] font-medium">
        {title}
        <span className="text-base text-[#8695a8] transition-transform group-open:rotate-180" aria-hidden="true">⌄</span>
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  )
}

export default function ProductsFilters() {
    const dispatch = useDispatch<AppDispatch>()
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryId = Number(searchParams.get('categoryId')) || undefined
  
  const {
    data: categories, loading, error, showAllCategories, minPrice, maxPrice, priceError,
  } = useSelector((state: RootState) => state.data) 

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

useEffect(() => {
  dispatch(setMinPrice(searchParams.get('minPrice') || ''))
  dispatch(setMaxPrice(searchParams.get('maxPrice') || ''))
}, [dispatch, searchParams])

  const visibleCategories = showAllCategories ? categories : categories.slice(0, 4)

  function selectCategory(id?: number) {
    const params = new URLSearchParams(searchParams)

    if (id) {
      params.set('categoryId', String(id))
    }
    else {
      params.delete('categoryId')
    }

    params.delete('subCategoryId')
    setSearchParams(params)
  }

  function applyPrice() {
  dispatch(setPriceError(''))

  const min = Number(minPrice)
  const max = Number(maxPrice)

  if (
    !Number.isFinite(min) ||
    !Number.isFinite(max) ||
    min < 0 ||
    max < 0
  ) {
    dispatch(setPriceError('Введите неотрицательные числа'))
    return
  }

  if (minPrice !== '' && maxPrice !== '' && min > max) {
    dispatch(setPriceError('Min не должен быть больше Max'))
    return
  }

  const params = new URLSearchParams(searchParams)

  if (minPrice !== '') {
    params.set('minPrice', minPrice)
  } else {
    params.delete('minPrice')
  }

  if (maxPrice !== '') {
    params.set('maxPrice', maxPrice)
  } else {
    params.delete('maxPrice')
  }

  setSearchParams(params)
}

  return (
    <aside className="w-full shrink-0 lg:w-[210px]" aria-label="Product filters">
<FilterSection title="Category">
  <div className="flex flex-col items-start gap-3 text-xs">
    <button
      className={`cursor-pointer ${
        !categoryId ? 'text-brand' : 'text-[#555]'
      }`}
      type="button"
      onClick={() => selectCategory()}
    >
      All products
    </button>

    {loading && <p>Загрузка категорий...</p>}

    {error && <p className="text-brand">{error}</p>}

    {visibleCategories.map((category) => (
      <button
        className={`cursor-pointer transition-colors hover:text-brand ${
          categoryId === category.id ? 'text-brand' : 'text-[#555]'
        }`}
        type="button"
        key={category.id}
        onClick={() => selectCategory(category.id)}
      >
        {category.categoryName}
      </button>
    ))}

    {categories.length > 4 && (
      <button
        className="cursor-pointer text-brand hover:underline"
        type="button"
        onClick={() => dispatch(toggleCategoriesList())}
      >
        {showAllCategories ? 'Show less' : 'See all'}
      </button>
    )}
  </div>
</FilterSection>

      <FilterSection title="Brands">
        <div className="flex flex-col gap-3">
          {brands.map((brand) => (
            <label className="flex cursor-pointer items-center gap-2.5 text-xs text-[#444]" key={brand}>
              <input className={checkboxClass} type="checkbox" name="brand" value={brand} />
              {brand}
            </label>
          ))}
          <button className="cursor-pointer self-start text-xs text-brand hover:underline" type="button">See all</button>
        </div>
      </FilterSection>

      <FilterSection title="Features">
        <div className="flex flex-col gap-3">
          {features.map((feature) => (
            <label className="flex cursor-pointer items-center gap-2.5 text-xs text-[#444]" key={feature}>
              <input className={checkboxClass} type="checkbox" name="feature" value={feature} />
              {feature}
            </label>
          ))}
          <button className="cursor-pointer self-start text-xs text-brand hover:underline" type="button">See all</button>
        </div>
      </FilterSection>

      <FilterSection title="Price range">
        <div className="relative mx-0.5 my-6 h-[3px] rounded bg-[#f8d7da]" aria-hidden="true">
          <span className="absolute top-1/2 left-1/4 size-3.5 -translate-y-1/2 rounded-full border border-brand bg-white" />
          <span className="absolute top-1/2 left-2/3 size-3.5 -translate-y-1/2 rounded-full border border-brand bg-white" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="relative rounded border border-[#d5d5d5] px-2 py-2.5">
            <span className="absolute -top-2 left-2 bg-white px-1 text-[9px] text-[#888]">Min</span>
            <input value={minPrice} onChange={(e) => dispatch(setMinPrice(e.target.value))} className="w-full min-w-0 text-xs outline-none placeholder:text-[#999]" type="number" min="0" placeholder="0" />
          </label>
          <label className="relative rounded border border-[#d5d5d5] px-2 py-2.5">
            <span className="absolute -top-2 left-2 bg-white px-1 text-[9px] text-[#888]">Max</span>
            <input value={maxPrice} onChange={(e) => dispatch(setMaxPrice(e.target.value))} className="w-full min-w-0 text-xs outline-none placeholder:text-[#999]" type="number" min="0" placeholder="999999" />
          </label>
        </div>
        <button onClick={applyPrice} className="mt-3 w-full cursor-pointer rounded border border-brand px-3 py-2 text-xs text-brand transition-colors hover:bg-brand hover:text-white" type="button">Apply</button>
      </FilterSection>

      <FilterSection title="Condition">
        <div className="flex flex-col gap-3">
          {conditions.map((condition) => (
            <label className="flex cursor-pointer items-center gap-2.5 text-xs text-[#444]" key={condition}>
              <input className={checkboxClass} type="radio" name="condition" value={condition} defaultChecked={condition === 'Any'} />
              {condition}
            </label>
          ))}
        </div>
      </FilterSection>


    </aside>
  )
}

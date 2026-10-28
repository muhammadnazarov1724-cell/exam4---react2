import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { getOurProducts } from '../../store/Redux'
import ProductCard from '../Products/ProductCard'
import { NavLink } from 'react-router-dom'

export default function OurProduct() {

    const dispatch = useDispatch<AppDispatch>()

    const {ourProducts, ourProductsLoading, ourProductsError} = useSelector((state: RootState) => state.data)

    useEffect(() => {
        dispatch(getOurProducts())
    },[dispatch])

  return (
    <section className="mt-16 pb-14">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-9 w-4 rounded bg-brand" />
        <p className="text-sm font-medium text-brand">
          Our Products
        </p>
      </div>

      <h2 className="mb-8 text-2xl font-semibold sm:text-3xl">
        Explore Our Products
      </h2>

      {ourProductsLoading && (
        <p className="py-10 text-sm text-[#777]">
          Загрузка товаров...
        </p>
      )}

      {ourProductsError && (
        <p className="py-10 text-brand">{ourProductsError}</p>
      )}

      {!ourProductsLoading && !ourProductsError && (
        <>
          {ourProducts.length === 0 && (
            <p className="py-10 text-sm text-[#777]">
              Товаров пока нет
            </p>
          )}

          <div className="grid grid-cols-1 gap-x-6 gap-y-9 min-[540px]:grid-cols-2 lg:grid-cols-4">
            {ourProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}

      <div className="mt-10 flex justify-center">
        <NavLink
          to="/products"
          className="rounded bg-brand px-10 py-3.5 text-sm text-white transition-colors hover:bg-[#c93636]"
        >
          View All Products
        </NavLink>
      </div>
    </section>
  )
}

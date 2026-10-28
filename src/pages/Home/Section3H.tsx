import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { NavLink } from 'react-router-dom'
import 'swiper/css'

export default function () {
  const {data, loading, error} = useSelector(
    (state: RootState) => state.data)  
    return (
       <section className="mt-14 border-b border-[#e5e5e5] pb-14">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-9 w-4 rounded bg-brand" />
        <p className="text-sm font-medium text-brand">Categories</p>
      </div>

      <div className="mb-7 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Browse By Category
        </h2>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label="Предыдущие категории"
            className="categories-prev grid size-9 cursor-pointer place-items-center rounded-full bg-[#f5f5f5] text-xl transition-colors hover:bg-brand hover:text-white disabled:cursor-default disabled:opacity-40"
          >
            ←
          </button>

          <button
            type="button"
            aria-label="Следующие категории"
            className="categories-next grid size-9 cursor-pointer place-items-center rounded-full bg-[#f5f5f5] text-xl transition-colors hover:bg-brand hover:text-white disabled:cursor-default disabled:opacity-40"
          >
            →
          </button>
        </div>
      </div>

      {loading && <p>Загрузка категорий...</p>}
      {error && <p className="text-brand">{error}</p>}

      {!loading && !error && data.length > 0 && (
        <Swiper
          modules={[Navigation]}
          slidesPerView={2}
          spaceBetween={20}
          speed={400}
          navigation={{
            prevEl: '.categories-prev',
            nextEl: '.categories-next',
          }}
          breakpoints={{
            540: {slidesPerView: 3},
            768: {slidesPerView: 4},
            1024: {slidesPerView: 6},
          }}
        >
          {data.map((category) => (
            <SwiperSlide key={category.id}>
              <NavLink
                to={`/products?categoryId=${category.id}`}
                className="group flex h-36 flex-col items-center justify-center gap-4 rounded border border-[#ccc] px-3 text-center transition-colors duration-200 hover:border-brand hover:bg-brand hover:text-white"
              >
                <img
                  src={`${import.meta.env.VITE_API}/images/${category.categoryImage}`}
                  alt=""
                  loading="lazy"
                  className="size-12 object-contain transition-transform duration-200 group-hover:scale-110"
                />

                <span className="text-sm">
                  {category.categoryName}
                </span>
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  )
}

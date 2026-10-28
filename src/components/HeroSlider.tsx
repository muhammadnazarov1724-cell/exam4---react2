import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Keyboard, Pagination } from 'swiper/modules'
import { setActiveSlide } from '../store/Redux'
import type { AppDispatch, RootState } from '../store/store'
import iphone from '../assets/iphone-banner.jpg'
import 'swiper/css'
import 'swiper/css/pagination'

const slides = [
  { id: 1, model: 'iPhone 14 Series', title: 'Up to 10%', subtitle: 'off Voucher' },
  { id: 2, model: 'iPhone 14 Pro', title: 'Pro. Beyond.', subtitle: 'Meet your next iPhone.' },
  { id: 3, model: 'Discover iPhone', title: 'A closer look.', subtitle: 'A new perspective.' },
]

export default function HeroSlider() {
  const dispatch = useDispatch<AppDispatch>()
  const activeSlide = useSelector((state: RootState) => state.data.activeSlide)

  return (
    <section className="order-first w-full min-w-0 lg:order-last lg:flex-1" aria-label="Store offers">
      <Swiper
        className="home-slider h-[400px] bg-black text-white sm:h-[420px] lg:h-full"
        modules={[Pagination, Keyboard, A11y]}
        slidesPerView={1}
        initialSlide={activeSlide}
        speed={600}
        loop
        pagination={{ clickable: true }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        onSlideChange={(swiper) => dispatch(setActiveSlide(swiper.realIndex))}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full overflow-hidden lg:flex lg:items-center">
              <img
                className="absolute -right-8 bottom-0 h-[220px] w-[72%] object-contain sm:inset-y-0 sm:right-0 sm:h-full sm:w-[58%] lg:scale-110"
                src={iphone}
                alt="Purple iPhone 14 Pro, front and back"
                width="1680"
                height="1194"
              />

              <div className="relative z-10 w-[72%] px-7 pt-9 pb-16 sm:w-[55%] sm:px-10 sm:pt-12">
                <div className="mb-5 flex items-center gap-4 sm:mb-6">
                  <svg width="30" height="35" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.05 12.536c.031 3.148 2.762 4.195 2.792 4.208-.023.074-.436 1.493-1.438 2.959-.866 1.267-1.764 2.529-3.18 2.555-1.39.026-1.837-.826-3.427-.826-1.589 0-2.086.8-3.401.852-1.368.052-2.41-1.37-3.283-2.632-1.784-2.578-3.148-7.285-1.317-10.463.91-1.578 2.537-2.578 4.304-2.604 1.344-.026 2.612.903 3.433.903.82 0 2.36-1.117 3.983-.953.68.028 2.588.275 3.813 2.068-.099.062-2.277 1.325-2.253 3.933M14.43 4.852c.725-.878 1.213-2.1 1.08-3.317-1.045.042-2.31.696-3.06 1.574-.672.777-1.26 2.022-1.101 3.215 1.165.09 2.356-.593 3.081-1.472" />
                  </svg>
                  <p className="text-xs text-white/90 sm:text-sm">{slide.model}</p>
                </div>

                <h2 className="text-[32px] leading-tight font-semibold tracking-wide sm:text-[42px] lg:text-5xl">
                  <span className="block">{slide.title}</span>
                  <span className="block">{slide.subtitle}</span>
                </h2>

                <a className="mt-6 inline-flex items-center gap-3 text-sm text-white transition-colors hover:text-[#ff8585]" href="#home-categories">
                  <span className="border-b border-white/70 pb-1">Shop Now</span>
                  <span className="text-xl" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

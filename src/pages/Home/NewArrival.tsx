import ps5 from '../../assets/ps5.png'
import woman from '../../assets/attractive-woman-wearing-hat-posing-black-background 1.png'
import speakers from '../../assets/speakers.png'
import perfume from '../../assets/perfume.png'

export default function NewArrival() {
  return (
    <section className="mt-14 pb-10">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-9 w-4 rounded bg-brand" />
        <p className="text-sm font-medium text-brand">Featured</p>
      </div>

      <h2 className="mb-8 text-2xl font-semibold sm:text-3xl">New Arrival</h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:h-[570px] lg:grid-cols-4 lg:grid-rows-2">
        <article className="group relative h-[440px] overflow-hidden rounded bg-black text-white sm:col-span-2 sm:h-[520px] lg:row-span-2 lg:h-auto">
          <img
            src={ps5}
            alt="Чёрная и белая консоли PlayStation 5 с контроллером"
            loading="lazy"
            className="absolute bottom-0 left-1/2 h-[90%] w-[94%] -translate-x-1/2 object-contain object-bottom transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

          <div className="absolute right-6 bottom-6 left-6 sm:bottom-8 sm:left-8">
            <h3 className="text-xl font-semibold sm:text-2xl">PlayStation 5</h3>
            <p className="mt-2 max-w-60 text-xs leading-5 text-white/90">
              Black and White version of the PS5 coming out on sale.
            </p>
            <button type="button" className="mt-3 cursor-pointer text-sm underline decoration-white/60 underline-offset-4 transition-colors hover:text-[#ddd]">
              Shop Now
            </button>
          </div>
        </article>

        <article className="group relative h-64 overflow-hidden rounded bg-[#0d0d0d] text-white sm:col-span-2 lg:h-auto">
          <img
            src={woman}
            alt="Женщина в чёрной шляпе"
            loading="lazy"
            className="absolute inset-y-0 right-0 h-full w-3/4 object-cover object-right transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

          <div className="absolute right-6 bottom-6 left-6">
            <h3 className="text-xl font-semibold sm:text-2xl">Women’s Collections</h3>
            <p className="mt-2 max-w-56 text-xs leading-5 text-white/90">
              Featured woman collections that give you another vibe.
            </p>
            <button type="button" className="mt-3 cursor-pointer text-sm underline decoration-white/60 underline-offset-4 transition-colors hover:text-[#ddd]">
              Shop Now
            </button>
          </div>
        </article>

        <article className="group relative h-64 overflow-hidden rounded bg-[#161616] text-white lg:h-auto">
          <div className="absolute inset-8 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />
          <img
            src={speakers}
            alt="Беспроводные колонки Amazon"
            loading="lazy"
            className="absolute top-4 left-[8%] h-4/5 w-[84%] object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <div className="absolute right-6 bottom-6 left-6">
            <h3 className="text-xl font-semibold sm:text-2xl">Speakers</h3>
            <p className="mt-1 text-xs leading-5 text-white/90">Amazon wireless speakers</p>
            <button type="button" className="mt-2 cursor-pointer text-sm underline decoration-white/60 underline-offset-4 transition-colors hover:text-[#ddd]">
              Shop Now
            </button>
          </div>
        </article>

        <article className="group relative h-64 overflow-hidden rounded bg-[#161616] text-white lg:h-auto">
          <div className="absolute inset-8 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />
          <img
            src={perfume}
            alt="Парфюм Gucci Intense Oud"
            loading="lazy"
            className="absolute top-4 left-[8%] h-4/5 w-[84%] object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <div className="absolute right-6 bottom-6 left-6">
            <h3 className="text-xl font-semibold sm:text-2xl">Perfume</h3>
            <p className="mt-1 text-xs leading-5 text-white/90">GUCCI INTENSE OUD EDP</p>
            <button type="button" className="mt-2 cursor-pointer text-sm underline decoration-white/60 underline-offset-4 transition-colors hover:text-[#ddd]">
              Shop Now
            </button>
          </div>
        </article>
      </div>
    </section>
  )
}

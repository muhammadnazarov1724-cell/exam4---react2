import kalonka from '../../assets/kalonka.png'

const timerItems = [
  {value: '23', label: 'Hours'},
  {value: '05', label: 'Days'},
  {value: '59', label: 'Minutes'},
  {value: '35', label: 'Seconds'},
]

export default function Kalonka() {
  return (
    <section className="relative mt-8 overflow-hidden bg-black px-6 py-10 text-white sm:px-10 sm:py-12 lg:flex lg:min-h-[450px] lg:items-center lg:px-14">
      <div className="relative z-10 lg:w-[46%]">
        <p className="text-sm font-semibold text-[#00ff66]">Categories</p>

        <h2 className="mt-7 text-3xl leading-tight font-semibold tracking-wide sm:text-4xl lg:text-5xl">
          <span className="block">Enhance Your</span>
          <span className="block">Music Experience</span>
        </h2>

        <div className="mt-7 flex gap-2 sm:gap-4">
          {timerItems.map((item) => (
            <div
              key={item.label}
              className="flex size-12 shrink-0 flex-col items-center justify-center rounded-full bg-white text-black sm:size-16"
            >
              <span className="text-sm leading-5 font-semibold">{item.value}</span>
              <span className="text-[9px] leading-3 sm:text-[10px]">{item.label}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-8 cursor-pointer rounded bg-[#00ff66] px-10 py-3.5 text-sm font-medium text-black transition-colors hover:bg-[#00df59]"
        >
          Buy Now!
        </button>
      </div>

      <div className="relative mt-8 h-60 w-full sm:h-80 lg:absolute lg:inset-y-0 lg:right-3 lg:mt-0 lg:h-auto lg:w-[56%]">
        <div className="absolute top-1/2 left-1/2 h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-3xl" aria-hidden="true" />
        <img
          src={kalonka}
          className="relative h-full w-full object-contain lg:p-6"
        />
      </div>
    </section>
  )
}

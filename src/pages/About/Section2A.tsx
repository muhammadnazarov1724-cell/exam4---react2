const statistics = [
  {
    value: '10.5k',
    label: 'Sellers active on our site',
    featured: false,
    icon: <><path d="M3 10h18l-2-7H5l-2 7ZM5 10v11h14V10M9 21v-7h6v7" /><path d="M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M9 3l-1 7m7-7 1 7" /></>,
  },
  {
    value: '33k',
    label: 'Monthly Product Sale',
    featured: true,
    icon: <><circle cx="12" cy="12" r="9" /><path d="M15 8.5c-1-1-6-1.5-6 1 0 3 6 1.5 6 4.5 0 2.5-5 2-6 1M12 5v14" /></>,
  },
  {
    value: '45.5k',
    label: 'Customers active on our site',
    featured: false,
    icon: <><path d="M5 7h14l1 14H4L5 7Z" /><path d="M9 9V5a3 3 0 0 1 6 0v4M9 12v5m6-5v5" /></>,
  },
  {
    value: '25k',
    label: 'Annual gross sales on our site',
    featured: false,
    icon: <><path d="m8 3 2 4h4l2-4H8Zm2 4C7 10 4 13 5 17c1 5 13 5 14 0 1-4-2-7-5-10M9 7h6" /><path d="M14 12h-3a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3m2-7v8" /></>,
  },
]

export default function Section2A() {
  return (
    <section className="mx-auto w-full max-w-[1170px] px-6 py-16 sm:py-24" aria-label="Store statistics">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statistics.map((item) => (
          <article
            key={item.value}
            className={`rounded border px-4 py-7 text-center ${item.featured ? 'border-brand bg-brand text-white shadow-md' : 'border-[#d5d5d5] bg-white'}`}
          >
            <div className={`mx-auto grid size-20 place-items-center rounded-full ${item.featured ? 'bg-white/35' : 'bg-[#c1c1c1]'}`}>
              <span className={`grid size-14 place-items-center rounded-full ${item.featured ? 'bg-white text-brand' : 'bg-black text-white'}`}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {item.icon}
                </svg>
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-wide">{item.value}</h2>
            <p className="mt-2 text-[13px] leading-6">{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

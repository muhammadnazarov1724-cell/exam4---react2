import { NavLink } from 'react-router-dom'

const inputClass = 'h-14 min-w-0 w-full rounded border border-[#d5d5d5] bg-white px-3.5 text-sm outline-none transition-colors placeholder:text-[#888] focus:border-brand'
const cardClass = 'rounded bg-white p-6 shadow-[0_3px_20px_#00000012] sm:p-8'

export default function Contact() {
  return (
    <main className="mx-auto min-h-[850px] w-full max-w-[1170px] px-6 pt-12 pb-24 sm:pt-16 lg:pb-40">
      <nav className="mb-10 flex items-center gap-3 text-xs sm:mb-12" aria-label="Breadcrumb">
        <NavLink to="/" className="text-[#888] transition-colors hover:text-brand">Home</NavLink>
        <span className="text-[#999]" aria-hidden="true">/</span>
        <span>Contact</span>
      </nav>

      <h1 className="sr-only">Contact</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className={`${cardClass} lg:w-[340px] lg:shrink-0`}>
          <section aria-labelledby="contact-call-title">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m7 3 3 5-2.5 2.5a15 15 0 0 0 6 6L16 14l5 3-1 4c-8.5 1-17-7.5-16-16l3-2Z" />
                </svg>
              </span>
              <h2 id="contact-call-title" className="text-base font-semibold">Call To Us</h2>
            </div>

            <div className="mt-5 space-y-3 text-[13px] leading-6">
              <p>We are available 24/7, 7 days a week.</p>
              <p>Phone: +8801611112222</p>
            </div>
          </section>

          <hr className="my-7 border-[#ddd]" />

          <section aria-labelledby="contact-write-title">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="1" />
                  <path d="m3 6 9 7 9-7" />
                </svg>
              </span>
              <h2 id="contact-write-title" className="text-base font-semibold">Write To Us</h2>
            </div>

            <div className="mt-5 space-y-3 text-[13px] leading-6 break-words">
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Emails: customer@exclusive.com</p>
              <p>Emails: support@exclusive.com</p>
            </div>
          </section>
        </aside>

        <form className={`${cardClass} flex min-w-0 flex-1 flex-col`} onSubmit={(event) => event.preventDefault()} aria-label="Contact form">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <input className={inputClass} type="text" name="name" placeholder="Name" aria-label="Name" />
            <input className={inputClass} type="email" name="email" placeholder="Email" aria-label="Email" />
            <input className={inputClass} type="tel" name="phone" placeholder="Phone" aria-label="Phone" />
          </div>

          <textarea
            className="mt-6 min-h-48 w-full flex-1 resize-y rounded border border-[#d5d5d5] bg-white px-3.5 py-4 text-sm outline-none transition-colors placeholder:text-[#888] focus:border-brand"
            name="message"
            placeholder="Your Message"
            aria-label="Your Message"
            rows={7}
          />

          <button type="button" className="mt-6 w-full cursor-pointer self-end rounded bg-brand px-10 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#c93636] sm:w-auto">
            Send Message
          </button>
        </form>
      </div>
    </main>
  )
}

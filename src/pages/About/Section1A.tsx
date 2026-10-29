import { NavLink } from 'react-router-dom'
import storyImage from '../../assets/toGirls.png'

export default function Section1A() {
  return (
    <section className="mx-auto w-full max-w-[1170px] px-6 pt-12 sm:pt-16" aria-labelledby="about-story-title">
      <nav className="mb-10 flex items-center gap-3 text-xs sm:mb-12" aria-label="Breadcrumb">
        <NavLink to="/" className="text-[#888] transition-colors hover:text-brand">Home</NavLink>
        <span className="text-[#999]" aria-hidden="true">/</span>
        <span>About</span>
      </nav>

      <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-14">
        <div>
          <h1 id="about-story-title" className="mb-6 text-4xl font-semibold tracking-wide sm:text-5xl">Our Story</h1>

          <div className="space-y-5 text-sm leading-7">
            <p>
              Launched in 2015, Exclusive is South Asia’s premier online shopping
              marketplace with an active presence in Bangladesh. Supported by a
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sellers and 300 brands and serves 3 million
              customers across the region.
            </p>
            <p>
              Exclusive has more than 1 million products to offer, growing at a
              very fast pace. Exclusive offers a diverse assortment in categories
              ranging from consumer goods to lifestyle products.
            </p>
          </div>
        </div>

        <img
          src={storyImage}
          alt="Две девушки с покупками на розовом фоне"
          className="aspect-[570/415] w-full rounded object-cover"
          width="570"
          height="415"
        />
      </div>
    </section>
  )
}

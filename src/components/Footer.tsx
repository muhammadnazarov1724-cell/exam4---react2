import { NavLink } from 'react-router-dom'
import Icon from './Icon'

const headingClass = 'mb-[22px] text-[19px] leading-[1.4] font-medium max-[721px]:mb-[18px] max-[721px]:text-lg'
const footerLinkClass = 'cursor-pointer border-0 bg-transparent p-0 text-left text-[13px] leading-[1.65] text-[#f2f2f2] no-underline transition duration-200 hover:text-[#ff8c8c]'
const navLinkClass = `${footerLinkClass} mb-[13px] hover:translate-x-[3px]`
const socialButtonClass = `${footerLinkClass} flex hover:-translate-y-[3px]`

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#050505] text-[#fafafa]">
      <div className="mx-auto grid w-[min(1170px,calc(100%-80px))] grid-cols-[1.35fr_1.15fr_.8fr_.9fr_.8fr] gap-[42px] pt-[58px] pb-[42px] max-[1101px]:grid-cols-[1.3fr_1.25fr_.8fr_1fr] max-[1101px]:gap-7 max-[851px]:w-[calc(100%-48px)] max-[721px]:grid-cols-2 max-[721px]:gap-x-7 max-[721px]:gap-y-[34px] max-[721px]:pt-[42px] max-[721px]:pb-9 max-[541px]:w-[calc(100%-40px)] max-[381px]:grid-cols-1">
        <section aria-labelledby="footer-exclusive">
          <h2 className="mb-[17px] text-[25px] leading-[1.4] font-[650] tracking-[.2px] max-[721px]:text-2xl" id="footer-exclusive">Exclusive</h2>
          <h3 className="mb-[21px] text-[19px] leading-[1.4] font-medium max-[721px]:mb-[18px] max-[721px]:text-lg">Subscribe</h3>
          <p className="text-[13px] leading-[1.8]">Get 10% off your first order</p>
          <form className="mt-[13px] flex max-w-[217px] items-center gap-2.5 rounded border border-[#c9c9c9] px-3 py-2.5 transition duration-200 focus-within:border-[#fafafa] focus-within:shadow-[0_0_0_3px_#ffffff16] max-[381px]:max-w-[260px]" onSubmit={(event) => event.preventDefault()}>
            <input className="min-w-0 w-full border-0 bg-transparent text-[13px] text-white outline-none placeholder:text-[#858585] focus-visible:outline-none!" type="email" placeholder="Enter your email" aria-label="Email for newsletter" required />
            <button className={`${footerLinkClass} flex shrink-0 hover:translate-x-0.5`} type="submit" aria-label="Subscribe to newsletter"><Icon name="send" width="21" height="21" /></button>
          </form>
        </section>

        <section aria-labelledby="footer-support">
          <h2 className={headingClass} id="footer-support">Support</h2>
          <address className="flex flex-col items-start gap-[13px] not-italic">
            <p className="text-[13px] leading-[1.8]">111 Bijoy sarani, Dhaka,<br />DH 1515, Bangladesh.</p>
            <a className={footerLinkClass} href="mailto:exclusive@gmail.com">exclusive@gmail.com</a>
            <a className={footerLinkClass} href="tel:+88015888889999">+88015-88888-9999</a>
          </address>
        </section>

        <nav className="flex flex-col items-start" aria-labelledby="footer-account">
          <h2 className={headingClass} id="footer-account">Account</h2>
          <NavLink className={navLinkClass} to="/login">My Account</NavLink>
          <button className={navLinkClass} type="button">Cart</button>
          <button className={navLinkClass} type="button">Wishlist</button>
          <NavLink className={navLinkClass} to="/">Shop</NavLink>
        </nav>

        <nav className="flex flex-col items-start" aria-labelledby="footer-links">
          <h2 className={headingClass} id="footer-links">Quick Link</h2>
          <button className={navLinkClass} type="button">Privacy Policy</button>
          <button className={navLinkClass} type="button">Terms Of Use</button>
          <button className={navLinkClass} type="button">FAQ</button>
          <button className={navLinkClass} type="button">Contact</button>
        </nav>

        <section className="max-[1101px]:col-span-full max-[1101px]:flex max-[1101px]:items-center max-[1101px]:gap-[30px]" aria-labelledby="footer-social">
          <h2 className={`${headingClass} max-[1101px]:mb-0!`} id="footer-social">Social</h2>
          <div className="flex gap-[19px]">
            <button className={socialButtonClass} type="button" aria-label="Facebook"><Icon name="facebook" width="19" height="19" /></button>
            <button className={socialButtonClass} type="button" aria-label="Twitter"><Icon name="twitter" width="19" height="19" /></button>
            <button className={socialButtonClass} type="button" aria-label="Instagram"><Icon name="instagram" width="19" height="19" /></button>
            <button className={socialButtonClass} type="button" aria-label="LinkedIn"><Icon name="linkedin" width="19" height="19" /></button>
          </div>
        </section>
      </div>
      <div className="flex min-h-[65px] items-center justify-center gap-2 border-t border-[#1b1b1b] px-5 py-3.5 text-center text-[13px] text-[#777] max-[381px]:text-[11px]"><span className="text-[21px] leading-none" aria-hidden="true">©</span> Copyright Rimel 2022. All right reserved</div>
    </footer>
  )
}

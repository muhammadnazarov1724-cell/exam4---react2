import { useEffect, useRef, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { setAccountMenuOpen } from '../store/Redux'
import Icon from './Icon'
import logo from '../assets/logo.png'
import { handleLogout } from '../utils/token'

const navLinkClass = 'relative cursor-pointer whitespace-nowrap border-0 bg-transparent py-[7px] text-sm text-[#161616] no-underline transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-[3px] after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 hover:text-brand hover:after:scale-x-100 max-[851px]:self-start max-[851px]:py-2.5'
const iconButtonClass = 'inline-flex h-[38px] w-[34px] cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-[5px] text-[#151515] transition duration-200 hover:-translate-y-0.5 hover:bg-[#fff1f1] hover:text-brand'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const [searchParams] = useSearchParams()
  const dispatch = useDispatch<AppDispatch>()
  const accountMenuOpen = useSelector((state: RootState) => state.data.accountMenuOpen)
  const wishlistCount = useSelector((state: RootState) => state.data.wishlist.length)
  const accountMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!accountMenuOpen) return

    function closeOnOutsideClick(event: PointerEvent) {
      if (!accountMenuRef.current?.contains(event.target as Node)) {
        dispatch(setAccountMenuOpen(false))
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        dispatch(setAccountMenuOpen(false))
        accountMenuRef.current?.querySelector('button')?.focus()
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [accountMenuOpen, dispatch])

  return (
    <header className="relative z-10 border-b border-[#e9e9e9] bg-white">
      <div className="mx-auto flex min-h-[86px] w-[min(1170px,calc(100%-80px))] items-center justify-between gap-8 max-[1101px]:gap-5 max-[851px]:min-h-[76px] max-[851px]:w-[calc(100%-48px)] max-[541px]:min-h-[72px] max-[541px]:w-[calc(100%-40px)] max-[541px]:gap-3">
        <NavLink to="/" className="inline-flex shrink-0 items-center transition-transform duration-200 hover:translate-x-[3px]" aria-label="Fastcart home" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Fastcart" width="170" height="44" className="h-auto w-[170px] object-contain max-[541px]:w-[145px]" />
        </NavLink>

        <nav className={`items-center gap-8 max-[1101px]:gap-[22px] max-[851px]:absolute max-[851px]:inset-x-0 max-[851px]:top-[calc(100%+1px)] max-[851px]:items-stretch max-[851px]:gap-1.5 max-[851px]:border-b max-[851px]:border-[#ececec] max-[851px]:bg-white max-[851px]:px-8 max-[851px]:pt-[18px] max-[851px]:pb-6 max-[851px]:shadow-[0_16px_24px_#00000006] ${menuOpen ? 'flex max-[851px]:animate-nav-enter max-[851px]:flex-col' : 'hidden min-[851px]:flex'}`} id="store-navigation" aria-label="Main navigation">
          <NavLink to="/" className={navLinkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to='/contact' className={navLinkClass} type="button">Contact</NavLink>
          <NavLink to='/about' className={navLinkClass} type="button">About</NavLink>
          <NavLink to='/register' className={`${navLinkClass} `} type="button">Sign Up</NavLink>
        </nav>

        <div className="flex items-center gap-[17px] max-[1101px]:gap-2.5 max-[541px]:gap-[9px]">
          <form action="/products" method='get' role='search'
          className="flex w-60 items-center gap-2.5 rounded-[5px] border border-transparent bg-[#f5f5f5] py-[11px] pr-3.5 pl-[17px] transition-colors duration-200 focus-within:border-[#d5d5d5] focus-within:bg-white max-[1101px]:w-[200px] max-[851px]:w-[190px] max-[541px]:hidden">
          <input type="search" name="search" defaultValue={searchParams.get('search') || ''} className="min-w-0 w-full border-0 bg-transparent text-[11px] text-[#161616] outline-none placeholder:text-[#818181] focus-visible:outline-none!" placeholder="What are you looking for?"/>
          <button type='submit' className='shrink-0 cursor-pointer'>
            <Icon name="search" width="20" height="20" />
          </button>
          </form>
           <NavLink
             to="/wishlist"
             className={`${iconButtonClass} relative max-[541px]:hidden`}
             aria-label={`Wishlist: ${wishlistCount} товаров`}
           >
             <Icon name="heart" />

             {wishlistCount > 0 && (
               <span className="absolute top-0 right-0 grid h-[15px] min-w-[15px] place-items-center rounded-full border-2 border-white bg-brand px-[3px] text-[9px] leading-none text-white">
                 {wishlistCount}
               </span>
             )}
           </NavLink>          
           <button className={`${iconButtonClass} relative`} type="button" aria-label="Shopping cart, 2 items">
            <Icon name="cart" /><span className="absolute top-0 right-0 grid h-[15px] min-w-[15px] place-items-center rounded-full border-2 border-white bg-brand px-[3px] text-[9px] leading-none text-white">2</span>
          </button>
          <div className="relative shrink-0" ref={accountMenuRef}>
            <button
              type="button"
 
              onClick={() => dispatch(setAccountMenuOpen(!accountMenuOpen))}
              className={`inline-flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors ${accountMenuOpen ? 'bg-brand text-white' : 'text-[#151515] hover:bg-[#fff1f1] hover:text-brand'}`}
            >
              <Icon name="user" width="22" height="22" />
            </button>

            {accountMenuOpen && (
              <div id="account-dropdown" className="absolute top-full right-0 z-30 mt-4 w-52 animate-nav-enter rounded bg-black/70 py-2 text-white shadow-lg backdrop-blur-xl">
                <NavLink to="/account" onClick={() => dispatch(setAccountMenuOpen(false))} className="flex w-full cursor-pointer items-center gap-3 px-5 py-3 text-left text-sm transition-colors hover:bg-white/15">
                  <Icon name="user" width="20" height="20" />
                  My Account
                </NavLink>
                <button type="button" className="flex w-full cursor-pointer items-center gap-3 px-5 py-3 text-left text-sm transition-colors hover:bg-white/15">
                  <Icon name="bag" width="20" height="20" />
                  My Order
                </button>
                <button type="button" className="flex w-full cursor-pointer items-center gap-3 px-5 py-3 text-left text-sm transition-colors hover:bg-white/15 min-[541px]:hidden">
                  <Icon name="heart" width="20" height="20" />
                  Wishlist
                </button>
                <button onClick={handleLogout} type="button" className="flex w-full cursor-pointer items-center gap-3 px-5 py-3 text-left text-sm transition-colors hover:bg-white/15">
                  <Icon name="logout" width="20" height="20" />
                  Logout
                </button>
              </div>
            )}
          </div>
          <button className={`${iconButtonClass} min-[851px]:hidden`} type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="store-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  )
}

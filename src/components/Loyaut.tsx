import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Loyaut() {
  return (
    <div className="font-storefront flex min-h-svh flex-col bg-white text-[#111] antialiased [&_svg]:align-middle [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-brand [&_:focus-visible]:outline-offset-5 motion-reduce:[&_*]:animate-none motion-reduce:[&_*]:transition-none motion-reduce:[&_*::before]:transition-none motion-reduce:[&_*::after]:transition-none">

        <Header/>
        <Outlet/>
        <Footer/>

    </div>
  )
}

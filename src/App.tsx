import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Loyaut from './components/Loyaut'

const Home = lazy(() => import('./pages/Home/Home'))
const Login = lazy(() => import('./pages/Login/Login'))
const Register = lazy(() => import('./pages/Register/Register'))
const Products = lazy(() => import('./pages/Products/Products'))
const Account = lazy(() => import('./pages/Account/Account'))
const Contact = lazy(() => import('./pages/Contact/Contact'))
const About = lazy(() => import('./pages/About/About'))
const Wishlist = lazy(() => import('./pages/Wishlist/Wishlist'))
const InfoProduct = lazy(() => import('./pages/InfoProduct/InfoProduct'))
const Korzina = lazy(() => import('./pages/Korzina/Korzina'))


export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Loyaut/>,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Home/>
            </Suspense>
          )
        },
        {
          path: '/login',
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Login/>
            </Suspense>
          )
        },
        {
          path: '/register',
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Register/>
            </Suspense>
          )
        },
        {
          path: '/products',
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Products />
            </Suspense>
          ),
        },
        {
          path: '/account',
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Account />
            </Suspense>
          ),
        },
        {
          path: '/contact',
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Contact />
            </Suspense>
          ),
        },
        {
          path: '/about',
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <About />
            </Suspense>
          ),
        },
        {
          path: '/wishlist',
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Wishlist />
            </Suspense>
          ),
        },
        {
          path: '/products/:id',
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <InfoProduct />
            </Suspense>
          ),
        },
        {
          path: '/cart',
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Korzina />
            </Suspense>
          ),
        },
      ]
    }
  ])
  return <RouterProvider router={router}/>
}

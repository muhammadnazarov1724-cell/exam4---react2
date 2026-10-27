import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Loyaut from './components/Loyaut'

const Home = lazy(() => import('./pages/Home/Home'))

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
        }
      ]
    }
  ])
  return <RouterProvider router={router}/>
}

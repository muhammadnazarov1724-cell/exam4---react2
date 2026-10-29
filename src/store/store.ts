import { configureStore } from '@reduxjs/toolkit'
import dataSlice  from './Redux'

export const store = configureStore({
  reducer: {
    data: dataSlice
  }
})

let previousWishlist = store.getState().data.wishlist
let previousCart = store.getState().data.cart

store.subscribe(() => {
  const {wishlist, cart} = store.getState().data

  try {
    if (wishlist !== previousWishlist) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
      previousWishlist = wishlist
    }

    if (cart !== previousCart) {
      localStorage.setItem('cart', JSON.stringify(cart))
      previousCart = cart
    }
  } catch (error) {
    console.log(error)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
import { configureStore } from '@reduxjs/toolkit'
import dataSlice  from './Redux'

export const store = configureStore({
  reducer: {
    data: dataSlice
  }
})

let previousWishlist = store.getState().data.wishlist

store.subscribe(() => {
  const wishlist = store.getState().data.wishlist

  if (wishlist === previousWishlist) 
    return previousWishlist = wishlist

  try {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))  
  } catch (error) {
    console.log(error);
  }

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
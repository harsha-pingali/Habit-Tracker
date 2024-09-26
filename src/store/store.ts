import { configureStore } from '@reduxjs/toolkit'
import habbitsReducer from './habbitSlice'
import quoteReducer from './quoteSlice'
const store = configureStore({
   reducer: {
      habbits: habbitsReducer,
      quote: quoteReducer,
   },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store

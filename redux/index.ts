import { configureStore } from '@reduxjs/toolkit'
import carousel from './slices/carousel'

export default configureStore({
  reducer: {
    carousel,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

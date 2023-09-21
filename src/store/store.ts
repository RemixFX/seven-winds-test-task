import { configureStore } from '@reduxjs/toolkit'
import { outlayStringControllerApi } from '../api'


export const store = configureStore({
  reducer: {
    [outlayStringControllerApi.reducerPath]: outlayStringControllerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(outlayStringControllerApi.middleware),
})

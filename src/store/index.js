import {configureStore} from '@reduxjs/toolkit'
import { serviceApiMarvel } from '../api/serviceApiMarvel'

const store = configureStore({
    reducer: {[serviceApiMarvel.reducerPath]: serviceApiMarvel.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(serviceApiMarvel.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store
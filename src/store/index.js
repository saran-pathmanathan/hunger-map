import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { foodSecApi } from './apis/foodSecApi';
import { headerReducer, headerChange } from './slice/headerSlice';
import { changeCountry, countryReducer } from './slice/countrySlice';



export const store = configureStore({
    reducer: {
        header: headerReducer,
        country: countryReducer,
        [foodSecApi.reducerPath]: foodSecApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(foodSecApi.middleware)
    }
})

setupListeners(store.dispatch)

export { useFetchIPCQuery, useFetchInfoQuery, useFetchHazardQuery } from './apis/foodSecApi'
export { headerChange, changeCountry }

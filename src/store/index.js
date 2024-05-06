import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { foodSecApi } from './apis/foodSecApi';
import { backendApi } from './apis/backend';
import { headerReducer, headerChange } from './slice/headerSlice';
import { changeCountry, countryReducer , changeISO3} from './slice/countrySlice';
import { payloadReducer, setPopulation, setIncomeGroup, setIpc, setFcs, setRcsi, setRainfall, setNdvi } from './slice/payloadSlice';


export const store = configureStore({
    reducer: {
        header: headerReducer,
        country: countryReducer,
        payload: payloadReducer,
        [foodSecApi.reducerPath]: foodSecApi.reducer,
        [backendApi.reducerPath]: backendApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(foodSecApi.middleware)
            .concat(backendApi.middleware)
    }
})

setupListeners(store.dispatch)

export { useFetchIPCQuery, useFetchInfoQuery, useFetchHazardQuery, useFetchFcsMutation,useFetchNdviQuery } from './apis/foodSecApi'
export { useFetchPredictionMutation , useFetchPlotMutation} from './apis/backend'
export { headerChange, changeCountry , changeISO3,setPopulation, setIncomeGroup, setIpc, setFcs, setRcsi, setRainfall, setNdvi }

import { createSlice } from '@reduxjs/toolkit';

const countrySlice = createSlice({
    name: 'country',
    initialState: { id: 'Niger', iso3: 'NER'},
    reducers: {
        changeCountry(state, action) {
            state.id = action.payload
        },
        changeISO3(state, action) {
            state.iso3 = action.payload
        }
    }
})

export const { changeCountry, changeISO3 } = countrySlice.actions;
export const countryReducer = countrySlice.reducer;
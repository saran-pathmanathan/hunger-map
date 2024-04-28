import { createSlice } from '@reduxjs/toolkit';

const countrySlice = createSlice({
    name: 'country',
    initialState: { id: 'Niger' },
    reducers: {
        changeCountry(state, action) {
            state.id = action.payload
        }
    }
})

export const { changeCountry } = countrySlice.actions;
export const countryReducer = countrySlice.reducer;
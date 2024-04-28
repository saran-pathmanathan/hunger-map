import { createSlice } from '@reduxjs/toolkit';

const headerSlice = createSlice({
    name: 'header',
    initialState: { id: 0 },
    reducers: {
        headerChange(state, action) {
            state.id = action.payload
        }
    }
})

export const { headerChange } = headerSlice.actions;
export const headerReducer = headerSlice.reducer;
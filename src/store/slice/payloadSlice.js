import { createSlice } from '@reduxjs/toolkit';

const payloadSlice = createSlice({
    name: 'payload',
    initialState: { "population":0, "income_group": "", "ipc": 0, "fcs": 0, "rcsi": 0, "rainfall": 0, "ndvi": 0},
    reducers: {
        setPopulation(state, action) {
            state.population = action.payload;
        },
        setIncomeGroup(state, action) {
            state.income_group = action.payload;
        },
        setIpc(state, action) {
            state.ipc = action.payload;
        },
        setFcs(state, action) {
            state.fcs = action.payload;
        },
        setRcsi(state, action) {
            state.rcsi = action.payload;
        },
        setRainfall(state, action) {
            state.rainfall = action.payload;
        },
        setNdvi(state, action) {
            state.ndvi = action.payload;
        }
    }
})

export const { setPopulation, setIncomeGroup, setIpc, setFcs, setRcsi, setRainfall, setNdvi } = payloadSlice.actions;
export const payloadReducer = payloadSlice.reducer;
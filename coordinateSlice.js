import { createSlice } from "@reduxjs/toolkit";

export const coordinateSlice = createSlice({
    name: 'coordinate',
    initialState: {
            lat: 61.28527651284786,
            lon: 63.17582723137468,
    },
    reducers: {
        swap: (state, data) => { 
            state.lat = data.payload.lat;
            state.lon = data.payload.lon;
        }
    }
})

export const {swap} = coordinateSlice.actions; 
export const selectCoordinate = state => state.coordinate; // Сеттер
export default coordinateSlice.reducer;
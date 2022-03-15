import { createSlice } from "@reduxjs/toolkit";

export const coordinateSlice = createSlice({
    name: 'coordinate',
    initialState: {
            name: "Ноль",
            lat: 0,
            lon: 0,
    },
    reducers: {
        swap: (state, data) => { 
            data.payload.name ? state.name = data.payload.name : state.name = "Координаты с карты";
            state.lat = data.payload.lat;
            state.lon = data.payload.lon;
        }
    }
})

export const {swap} = coordinateSlice.actions; 
export const selectCoordinate = state => state.coordinate; // Сеттер
export default coordinateSlice.reducer;
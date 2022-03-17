import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getData} from './dataFunction'


  export async function coords(){
    const data = await getData();
    return data;
}
export const fetchCoords = createAsyncThunk("coordinate/fetchStorage", async () => coords());

export const coordinateSlice = createSlice({
    name: 'coordinate',
    initialState: {
        name: 0,
        lat: 0,
        lon: 0,
    },
    reducers: {
        swap: (state, data) => { 
            data.payload.name ? state.name = data.payload.name : state.name = "Координаты с карты";
            state.lat = data.payload.lat;
            state.lon = data.payload.lon;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchCoords.fulfilled, (state, data) => {
            data.payload[0] ? state.name = data.payload[0] : state.name = "Координаты с карты";
            state.lat = data.payload[1];
            state.lon = data.payload[2];
        })
    }
})

export const {swap} = coordinateSlice.actions; 
export const selectCoordinate = state => state.coordinate; // Сеттер
export default coordinateSlice.reducer;
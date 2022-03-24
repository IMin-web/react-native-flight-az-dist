import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        value:{}
    },
    reducers: {
        set: (state, data) => { 
            state.value = data.payload;
        }
    }
})

export const {set} = dataSlice.actions; 
export const selectData = state => state.data; // Сеттер
export default dataSlice.reducer;
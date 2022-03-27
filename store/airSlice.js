import { createSlice } from "@reduxjs/toolkit";

export const airSlice = createSlice({
    name: 'air',
    initialState: {
        value:[]
    },
    reducers: {
        setAir: (state, data) => {
            state.value = [data.payload];
        },
        delAir: (state, data) => {
            state.value[0].map((item) => {
                if(item.includes(data.payload)){
                    state.value[0].splice(state.value[0].indexOf(item), 1)
                }
            });
            // console.log(state.value);

        }
    }
})

export const {setAir, delAir} = airSlice.actions; 
export const selectAir = state => state.air.value[0]; // Сеттер
export default airSlice.reducer;
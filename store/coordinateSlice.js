import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../localStorage";

export async function coords() {
  const data = await getData();
  return data;
}
export const fetchCoords = createAsyncThunk(
  "coordinate/fetchStorage",
  async () => coords()
);

export const coordinateSlice = createSlice({
  name: "coordinate",
  initialState: {
    name: 0,
    lat: 0,
    lon: 0,
    rad:0,
    latPred: 0,
    lonPred: 0,
  },
  reducers: {
    swap: (state, data) => {
      data.payload.name
        ? (state.name = data.payload.name)
        : (state.name = "Координаты с карты");
        if(data.payload.lat) {state.lat = data.payload.lat};
        if(data.payload.lon) {state.lon = data.payload.lon};
      data.payload.rad ? state.rad = data.payload.rad : null;
      data.payload.rad ? state.latPred = (+data.payload.rad/(Math.cos(data.payload.lat * (Math.PI/180)) * 111.321377778) ) : null;
      data.payload.rad ? state.lonPred = (+data.payload.rad/111.134861111) : null;
    },
    swapRad: (state, data) => {
      data.payload.rad ? state.rad = data.payload.rad : null;
      data.payload.rad ? state.latPred = (+data.payload.rad/(Math.cos(state.lat * (Math.PI/180)) * 111.321377778) ) : null;
      data.payload.rad ? state.lonPred = (+data.payload.rad/111.134861111) : null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoords.fulfilled, (state, data) => {
      data.payload[0]
        ? (state.name = data.payload[0])
        : (state.name = "Координаты с карты");
      state.lat = data.payload[1];
      state.lon = data.payload[2];
      data.payload[3] ? state.rad = data.payload[3] : null;
      data.payload[3] ? state.latPred = (+data.payload[3]/(Math.cos(data.payload[1] * (Math.PI/180)) * 111.321377778)) : null;
      data.payload[3] ? state.lonPred = (+data.payload[3]/111.134861111) : null;
    });
  },
});

export const { swap, swapRad } = coordinateSlice.actions;
export const selectCoordinate = (state) => state.coordinate; // Сеттер
export default coordinateSlice.reducer;

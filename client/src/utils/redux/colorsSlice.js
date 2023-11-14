import { createSlice } from "@reduxjs/toolkit";

const colorsSlice = createSlice({
  name: "colors",
  initialState: {
    token: JSON.parse(sessionStorage.getItem("token")),
    isPlaying: false,
    currentTrack: [],
    queue: [],
    libraryCategory: "All",
    bgColor: {
      R: 18,
      G: 18,
      B: 18,
    },
    opacity: 0,
  },
  reducers: {
    setBgColor: (state, { payload }) => {
      state.bgColor = payload;
    },
    setOpacity: (state, { payload }) => {
      state.opacity = payload;
    },
  },
});

export const { setBgColor, setOpacity } = colorsSlice.actions;

export const selectBgColor = (state) => state.colors.bgColor;
export const selectOpacity = (state) => state.colors.opacity;

export default colorsSlice.reducer;


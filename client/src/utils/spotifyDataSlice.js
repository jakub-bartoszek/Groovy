import { createSlice } from "@reduxjs/toolkit";

const spotifyDataSlice = createSlice({
  name: "spotifyData",
  initialState: {
    token: JSON.parse(sessionStorage.getItem("token")),
    isPlaying: false,
    currentTrack: [],
    libraryCategory: "All"
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setCurrentTrack: (state, { payload }) => {
      state.currentTrack = [payload];
      state.isPlaying = true;
    },
    setLibraryCategory: (state, { payload }) => {
      state.libraryCategory = payload;
    }
  },
});

export const { setToken, setCurrentTrack, setLibraryCategory } = spotifyDataSlice.actions;
export const selectToken = (state) => state.spotifyData.token;
export const selectCurrentTrack = (state) => state.spotifyData.currentTrack;
export const selectIsPlaying = (state) => state.spotifyData.isPlaying;
export const selectLibraryCategory = (state) => state.spotifyData.libraryCategory;
export default spotifyDataSlice.reducer;


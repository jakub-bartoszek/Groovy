import { createSlice } from "@reduxjs/toolkit";

const spotifyDataSlice = createSlice({
  name: "spotifyData",
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
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setCurrentTrack: (state, { payload }) => {
      state.currentTrack = ([payload]);
      state.isPlaying = true;
    },
    addToQueue: (state, { payload }) => {
      state.queue = (payload);
      state.isPlaying = true;
    },
    setLibraryCategory: (state, { payload }) => {
      state.libraryCategory = payload;
    },

    setIsPlaying: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setBgColor: (state, { payload }) => {
      state.bgColor = payload;
    },
    setOpacity: (state, { payload }) => {
      state.opacity = payload;
    },

  },
});

export const { setToken, addToQueue, setCurrentTrack, setLibraryCategory, setIsPlaying, setBgColor, setOpacity } = spotifyDataSlice.actions;
export const selectToken = (state) => state.spotifyData.token;
export const selectCurrentTrack = (state) => state.spotifyData.currentTrack;
export const selectQueue = (state) => state.spotifyData.queue;
export const selectIsPlaying = (state) => state.spotifyData.isPlaying;
export const selectLibraryCategory = (state) => state.spotifyData.libraryCategory;
export const selectBgColor = (state) => state.spotifyData.bgColor;
export const selectOpacity = (state) => state.spotifyData.opacity;

export default spotifyDataSlice.reducer;


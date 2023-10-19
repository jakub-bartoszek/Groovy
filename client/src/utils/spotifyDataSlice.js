import { createSlice } from "@reduxjs/toolkit";

const spotifyDataSlice = createSlice({
  name: "spotifyData",
  initialState: {
    token: JSON.parse(sessionStorage.getItem("token")),
    isPlaying: false,
    currentTrack: [],
    queue: [],
    libraryCategory: "All"
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
    },
    setLibraryCategory: (state, { payload }) => {
      state.libraryCategory = payload;
    },
  },
});

export const { setToken, addToQueue, setCurrentTrack, setLibraryCategory } = spotifyDataSlice.actions;
export const selectToken = (state) => state.spotifyData.token;
export const selectCurrentTrack = (state) => state.spotifyData.currentTrack;
export const selectQueue = (state) => state.spotifyData.queue;
export const selectIsPlaying = (state) => state.spotifyData.isPlaying;
export const selectLibraryCategory = (state) => state.spotifyData.libraryCategory;
export default spotifyDataSlice.reducer;


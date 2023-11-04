import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    isPlaying: false,
    currentTrack: [],
    queue: [],
  },
  reducers: {
    setCurrentTrack: (state, { payload }) => {
      state.currentTrack = ([payload]);
      state.isPlaying = true;
    },
    addToQueue: (state, { payload }) => {
      state.queue = (payload);
      state.isPlaying = true;
    },
    setIsPlaying: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const { addToQueue, setCurrentTrack, setIsPlaying } = playerSlice.actions;
export const selectCurrentTrack = (state) => state.player.currentTrack;
export const selectQueue = (state) => state.player.queue;
export const selectIsPlaying = (state) => state.player.isPlaying;

export default playerSlice.reducer;


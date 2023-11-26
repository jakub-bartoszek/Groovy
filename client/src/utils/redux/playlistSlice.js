import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
 name: "playlist",
 initialState: {
  playlist: {
  },
  status: "",
  likedSongs: []
 },
 reducers: {
  fetchPlaylist: (state) => { },
  setStatus: (state, { payload }) => {
   state.status = payload;
  },
  fetchLikedSongs: (state) => { },
  setPlaylist: (state, { payload }) => {
   state.playlist = payload;
  },
  setLikedSongs: (state, { payload }) => {
   state.likedSongs = payload;
  }
 }
});

export const { fetchPlaylist, fetchLikedSongs, setPlaylist, setLikedSongs, setStatus } = playlistSlice.actions;

export const selectPlaylist = (state) => state.playlist.playlist;
export const selectLikedSongs = (state) => state.playlist.likedSongs;
export const selectStatus = (state) => state.playlist.status;

export default playlistSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlist: {
    },
    likedSongs: []
  },
  reducers: {
    fetchPlaylist: (state) => { },
    fetchLikedSongs: (state) => { },
    setPlaylist: (state, { payload }) => {
      state.playlist = payload;
    },
    setLikedSongs: (state, { payload }) => {
      state.likedSongs = payload;
    }
  }
});

export const { fetchPlaylist, fetchLikedSongs, setPlaylist, setLikedSongs } = playlistSlice.actions;

export const selectPlaylist = (state) => state.playlist.playlist;
export const selectLikedSongs = (state) => state.playlist.likedSongs;

export default playlistSlice.reducer;

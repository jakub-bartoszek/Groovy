import { createSlice } from "@reduxjs/toolkit";

const librarySlice = createSlice({
  name: "library",
  initialState: {
    playlists: [],
    movies: [],
    films: [],
    songs: []
  },
  reducers: {
    fetchPlaylists: state => { },
    setPlaylists: (state, { payload }) => {
      state.playlists = payload;
    },
  },
});

export const { fetchPlaylists, setPlaylists } = librarySlice.actions;

export const selectPlaylists = (state) => state.library.playlists;

export default librarySlice.reducer;


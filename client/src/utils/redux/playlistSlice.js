import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlist: {
    }
  },
  reducers: {
    fetchPlaylist: (state) => { },
    setPlaylist: (state, { payload }) => {
      state.playlist = payload;
    }
  }
});

export const { fetchPlaylist, setPlaylist } = playlistSlice.actions;

export const selectPlaylist = (state) => state.playlist.playlist;

export default playlistSlice.reducer;

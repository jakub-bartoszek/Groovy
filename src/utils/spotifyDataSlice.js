import { createSlice } from "@reduxjs/toolkit";

const spotifyDataSlice = createSlice({
  name: "spotifyData",
  initialState: {
    token: null,
    playlists: [],
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },

    setPlaylists: (state, { payload }) => {
      state.playlists = payload;
    }
  },
});

export const { setToken, setPlaylists } = spotifyDataSlice.actions;
export const selectToken = (state) => state.spotifyData.token;
export const selectPlaylists = (state) => state.spotifyData.playlists;
export default spotifyDataSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const spotifyDataSlice = createSlice({
  name: "spotifyData",
  initialState: {
    token: JSON.parse(localStorage.getItem("token")),
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


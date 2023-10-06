import { createSlice } from "@reduxjs/toolkit";

const spotifyDataSlice = createSlice({
  name: "spotifyData",
  initialState: {
    token: JSON.parse(sessionStorage.getItem("token")),
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },

  },
});

export const { setToken } = spotifyDataSlice.actions;
export const selectToken = (state) => state.spotifyData.token;
export default spotifyDataSlice.reducer;


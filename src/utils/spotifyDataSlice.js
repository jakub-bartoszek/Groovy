import { createSlice } from "@reduxjs/toolkit";

const spotifyDataSlice = createSlice({
  name: "spotifyData",
  initialState: {
    token: null
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
  },
});

export const { setToken } = spotifyDataSlice.actions;
export const selectToken = (state) => state.token;
export default spotifyDataSlice.reducer;


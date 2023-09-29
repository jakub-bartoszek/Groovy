import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: null
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export const selectToken = (state) => state.token;
export default tokenSlice.reducer;


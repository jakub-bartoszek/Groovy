import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchCategory: "track",
    searchQuery: ""
  },
  reducers: {
    setSearchCategory: (state, { payload }) => {
      state.libraryCategory = payload;
    },
    setSearchQuery: (state, { payload }) => {
      state.searchQuery = payload;
    }
  }
});

export const { setSearchCategory, setSearchQuery } = searchSlice.actions;
export const selectSearchCategory = (state) => state.search.searchCategory;
export const selectSearchQuery = (state) => state.search.searchQuery;

export default searchSlice.reducer;


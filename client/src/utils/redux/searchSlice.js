import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
	name: "search",
	initialState: {
		searchResults: [],
		status: "",
		searchCategory: "track",
		searchQuery: ""
	},
	reducers: {
		fetchSearchResults: (state) => { },
		setSearchResults: (state, { payload }) => {
			state.searchResults = payload;
		},
		setStatus: (state, { payload }) => {
			state.status = payload;
		},
		setSearchCategory: (state, { payload }) => {
			state.libraryCategory = payload;
		},
		setSearchQuery: (state, { payload }) => {
			state.searchQuery = payload;
		}
	}
});

export const {
	fetchSearchResults,
	setSearchResults,
	setStatus,
	setSearchCategory,
	setSearchQuery
} = searchSlice.actions;

export const selectSearchCategory = (state) => state.search.searchCategory;
export const selectSearchQuery = (state) => state.search.searchQuery;
export const selectSearchResults = (state) => state.search.searchResults;
export const selectStatus = (state) => state.search.status;

export default searchSlice.reducer;

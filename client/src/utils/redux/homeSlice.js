import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
	name: "home",
	initialState: {
		recentlyPlayed: []
	},
	reducers: {
		fetchRecentlyPlayed: (state) => {},
		setRecentlyPlayed: (state, { payload }) => {
			state.recentlyPlayed = payload;
		}
	}
});

export const { fetchRecentlyPlayed, setRecentlyPlayed } = homeSlice.actions;

export const selectRecentlyPlayed = (state) => state.home.recentlyPlayed;

export default homeSlice.reducer;

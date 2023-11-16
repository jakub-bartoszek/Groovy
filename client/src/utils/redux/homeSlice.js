import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
	name: "home",
	initialState: {
		status: "",
		recentlyPlayed: []
	},
	reducers: {
		fetchRecentlyPlayed: (state) => { },
		setStatus: (state, { payload }) => {
			state.status = payload;
		},
		setRecentlyPlayed: (state, { payload }) => {
			state.recentlyPlayed = payload;
		}
	}
});

export const { fetchRecentlyPlayed, setRecentlyPlayed, setStatus } = homeSlice.actions;

export const selectRecentlyPlayed = (state) => state.home.recentlyPlayed;
export const selectStatus = (state) => state.home.status;

export default homeSlice.reducer;

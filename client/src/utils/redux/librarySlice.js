import { createSlice } from "@reduxjs/toolkit";

const librarySlice = createSlice({
	name: "library",
	initialState: {
		status: "",
		playlists: [],
		topArtists: [],
		topTracks: []
	},
	reducers: {
		fetchPlaylists: (state) => { },
		fetchTopArtists: (state) => { },
		fetchTopTracks: (state) => { },
		setStatus: (state, { payload }) => {
			state.status = payload;
		},
		setPlaylists: (state, { payload }) => {
			state.playlists = payload;
		},
		setTopArtists: (state, { payload }) => {
			state.topArtists = payload;
		},
		setTopTracks: (state, { payload }) => {
			state.topTracks = payload;
		}
	}
});

export const {
	fetchPlaylists,
	fetchTopArtists,
	fetchTopTracks,
	setStatus,
	setPlaylists,
	setTopArtists,
	setTopTracks
} = librarySlice.actions;

export const selectStatus = (state) => state.library.status;
export const selectPlaylists = (state) => state.library.playlists;
export const selectTopArtists = (state) => state.library.topArtists;
export const selectTopTracks = (state) => state.library.topTracks;

export default librarySlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const spotifySlice = createSlice({
	name: "spotify",
	initialState: {
		clientId: "",
		clientSecret: ""
	},
	reducers: {
		setClientId: (state, { payload }) => {
			state.clientId = payload;
		},
		setClientSecret: (state, { payload }) => {
			state.clientSecret = payload;
		}
	}
});

export const {
	setClientId, setClientSecret
} = spotifySlice.actions;

export const selectClientId = (state) => state.spotify.clientId;
export const selectClientSecret = (state) => state.spotify.clientSecret;

export default spotifySlice.reducer;

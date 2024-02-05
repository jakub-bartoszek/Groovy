import { createSlice } from "@reduxjs/toolkit";

const artistSlice = createSlice({
 name: "artist",
 initialState: {
  artist: {},
  artistTracks: [],
  status: "",
 },
 reducers: {
  fetchArtist: () => { },
  setStatus: (state, { payload }) => {
   state.status = payload;
  },
  setArtist: (state, { payload }) => {
   state.artist = payload;
  },
  setArtistTracks: (state, { payload }) => {
   state.artistTracks = payload;
  }
 }
});

export const { fetchArtist, setStatus, setArtist, setArtistTracks } = artistSlice.actions;

export const selectArtist = (state) => state.artist.artist;
export const selectArtistTracks = (state) => state.artist.artistTracks;
export const selectStatus = (state) => state.artist.status;

export default artistSlice.reducer;

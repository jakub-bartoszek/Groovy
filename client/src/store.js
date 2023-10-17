import { configureStore } from "@reduxjs/toolkit";
import spotifyDataReducer from "./utils/spotifyDataSlice";

export default configureStore({
  reducer: {
    spotifyData: spotifyDataReducer,
  },
});
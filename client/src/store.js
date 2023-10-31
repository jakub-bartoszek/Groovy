import { configureStore } from "@reduxjs/toolkit";
import spotifyDataReducer from "./utils/spotifyDataSlice";
import searchReducer from "./utils/searchSlice";

export default configureStore({
  reducer: {
    spotifyData: spotifyDataReducer,
    search: searchReducer
  },
});
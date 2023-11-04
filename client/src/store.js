import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./utils/playerSlice";
import searchReducer from "./utils/searchSlice";
import colorsReducer from "./utils/colorsSlice";

export default configureStore({
  reducer: {
    player: playerReducer,
    search: searchReducer,
    colors: colorsReducer
  },
});
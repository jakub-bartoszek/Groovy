import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./utils/tokenSlice";

export default configureStore({
  reducer: {
    token: tokenReducer,
  },
});
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import searchReducer from "./utils/redux/searchSlice";
import playerReducer from "./utils/redux/playerSlice";
import colorsReducer from "./utils/redux/colorsSlice";
import libraryReducer from "./utils/redux/librarySlice";
import homeReducer from "./utils/redux/homeSlice";
import playlistReducer from "./utils/redux/playlistSlice";

import rootSaga from "./utils/saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    player: playerReducer,
    search: searchReducer,
    colors: colorsReducer,
    library: libraryReducer,
    home: homeReducer,
    playlist: playlistReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
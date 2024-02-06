import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import searchReducer from "./searchSlice";
import playerReducer from "./playerSlice";
import colorsReducer from "./colorsSlice";
import libraryReducer from "./librarySlice";
import homeReducer from "./homeSlice";
import playlistReducer from "./playlistSlice";
import spotifyReducer from "./spotifySlice";
import artistReducer from "./artistSlice";

import rootSaga from "../saga/sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		spotify: spotifyReducer,
		player: playerReducer,
		search: searchReducer,
		colors: colorsReducer,
		library: libraryReducer,
		home: homeReducer,
		playlist: playlistReducer,
		artist: artistReducer
	},
	middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
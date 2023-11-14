import { useEffect, useState } from "react";
import axios from "axios";
import { TopTrackItem } from "./TopTrackItem";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchTopTracks,
	selectTopTracks
} from "../../../../utils/redux/librarySlice";

export const TopTracks = ({ accessToken, width }) => {
	const topTracks = useSelector(selectTopTracks);
	const dispatch = useDispatch();

	useEffect(() => {
		if (accessToken) {
			dispatch(fetchTopTracks(accessToken));
		}
	}, [dispatch, accessToken]);

	return topTracks.map((track) => (
		<TopTrackItem
			key={nanoid()}
			item={track}
			width={width}
		/>
	));
};

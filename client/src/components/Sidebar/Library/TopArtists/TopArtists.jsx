import { useEffect } from "react";
import { ArtistItem } from "./ArtistItem";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchTopArtists,
	selectTopArtists
} from "../../../../utils/redux/librarySlice";

export const TopArtists = ({ accessToken, width }) => {
	const topArtists = useSelector(selectTopArtists);
	const dispatch = useDispatch();
	
	useEffect(() => {
		if (accessToken) {
			dispatch(fetchTopArtists(accessToken));
		}
	}, [dispatch, accessToken]);

	return topArtists.map((artist) => (
		<ArtistItem
			key={nanoid()}
			item={artist}
			width={width}
			path={`/artists/${artist.id}`}
		/>
	));
};

import { ArtistItem } from "./ArtistItem";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectTopArtists } from "../../../../utils/redux/librarySlice";

export const TopArtists = ({ accessToken, width }) => {
	const topArtists = useSelector(selectTopArtists);

	return topArtists.map((artist) => (
		<ArtistItem
			key={nanoid()}
			item={artist}
			width={width}
			path={`/artists/${artist.id}`}
		/>
	));
};

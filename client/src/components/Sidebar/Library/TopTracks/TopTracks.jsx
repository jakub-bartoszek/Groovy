import { TopTrackItem } from "./TopTrackItem";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectTopTracks } from "../../../../utils/redux/librarySlice";

export const TopTracks = ({ accessToken, width }) => {
	const topTracks = useSelector(selectTopTracks);

	return topTracks.map((track) => (
		<TopTrackItem
			key={nanoid()}
			item={track}
			width={width}
		/>
	));
};

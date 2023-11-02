import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
	selectToken,
	setCurrentTrack
} from "../../../../utils/spotifyDataSlice";
import { TopTrackItem } from "../TopTrackItem";

export const TopTracks = ({ accessToken, width }) => {
	const [topTracks, setTopTracks] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const getTopTracks = async () => {
			if (accessToken) {
				const response = await axios.get(
					`https://api.spotify.com/v1/me/top/tracks/`,
					{
						headers: {
							Authorization: "Bearer " + accessToken,
							"Content-Type": "application/json"
						}
					}
				);
				const items = response.data.items;
				setTopTracks(items);
			}
		};

		getTopTracks();
	}, [accessToken]);

	return topTracks.map((track) => (
			<TopTrackItem 
			item={track}
			width={width}/>
	));
};

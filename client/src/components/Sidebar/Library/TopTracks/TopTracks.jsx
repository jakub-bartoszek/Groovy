import { useEffect, useState } from "react";
import axios from "axios";
import { TopTrackItem } from "./TopTrackItem";
import { nanoid } from "@reduxjs/toolkit";

export const TopTracks = ({ accessToken, width }) => {
	const [topTracks, setTopTracks] = useState([]);

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
			key={nanoid()}
			item={track}
			width={width}
		/>
	));
};

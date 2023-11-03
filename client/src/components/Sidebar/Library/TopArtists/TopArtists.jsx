import { useEffect, useState } from "react";
import axios from "axios";

import { ArtistItem } from "./ArtistItem";
import { nanoid } from "@reduxjs/toolkit";

export const TopArtists = ({ accessToken, width }) => {
	const [topArtists, setTopArtists] = useState([]);

	useEffect(() => {
		const getTopArtists = async () => {
			if (accessToken) {
				const response = await axios.get(
					`https://api.spotify.com/v1/me/top/artists/`,
					{
						headers: {
							Authorization: "Bearer " + accessToken,
							"Content-Type": "application/json"
						}
					}
				);
				const items = response.data.items;
				setTopArtists(items);
			}
		};

		getTopArtists();
	}, [accessToken]);

	return topArtists.map((artist) => (
		<ArtistItem
		key={nanoid()}
			item={artist}
			width={width}
			path={`/artists/${artist.id}`}
		/>
	));
};

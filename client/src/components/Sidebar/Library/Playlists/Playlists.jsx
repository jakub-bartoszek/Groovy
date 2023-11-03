import { useEffect, useState } from "react";
import axios from "axios";
import { PlaylistItem } from "./PlaylistItem";

export const Playlists = ({ accessToken, width }) => {
	const [playlists, setPlaylists] = useState([]);

	useEffect(() => {
		const getPlaylist = async () => {
			if (accessToken) {
				const response = await axios.get(
					`https://api.spotify.com/v1/me/playlists/`,
					{
						headers: {
							Authorization: "Bearer " + accessToken,
							"Content-Type": "application/json"
						}
					}
				);
				const items = response.data.items;
				setPlaylists(items);
			}
		};

		getPlaylist();
	}, [accessToken]);

	return (
		<>
			<PlaylistItem
				path={`/liked`}
				name="Liked songs"
				likedSongs={true}
				width={width}
			/>
			{playlists.map((playlist) => (
				<PlaylistItem
					path={`/playlists/${playlist.id}`}
					item={playlist}
					width={width}
				/>
			))}
		</>
	);
};
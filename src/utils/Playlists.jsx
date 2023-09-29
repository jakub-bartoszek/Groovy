import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "./spotifyDataSlice";

export const Playlists = () => {
	const { token } = useSelector(selectToken);

	
	useEffect(() => {
		const getPlaylistData = async () => {
			const response = await axios.get(
				"https://api.spotify.com/v1/me/playlists",
				{
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json"
					}
				}
			);
			const { items } = response.data;
		};
		getPlaylistData();
	}, []);

	return <div></div>;
};

import { useEffect } from "react";
import {useStateProvider} from "./StateProvider";
import axios from "axios";

export const Playlists = () => {
	const [{ token, dispatch }] = useStateProvider();
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
      const {items} = response.data;
		};
		getPlaylistData();
	}, [token, dispatch]);

	return <div>Playlists</div>;
};

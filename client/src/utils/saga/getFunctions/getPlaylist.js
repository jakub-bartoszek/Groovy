import axios from "axios";

export const getPlaylist = async (accessToken, id) => {
	if (accessToken && id) {
		const response = await axios.get(
			`https://api.spotify.com/v1/playlists/${id}?limit=50`, {
			headers: {
				Authorization: "Bearer " + accessToken,
				"Content-Type": "application/json"
			}
		}
		);
		return await response.data;
	}
};
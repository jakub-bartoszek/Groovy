import axios from "axios";

export const getRecentlyPlayed = async (accessToken) => {
		if (accessToken) {
			const response = await axios.get(
				`https://api.spotify.com/v1/me/player/recently-played?limit=5`, {
				headers: {
					Authorization: "Bearer " + accessToken,
					"Content-Type": "application/json"
				}
			}
			);
			return await response.data.items;
		}
};
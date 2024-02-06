import axios from "axios";

export const getTopArtists = async (accessToken) => {
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
			return await response.data.items;
		}
};

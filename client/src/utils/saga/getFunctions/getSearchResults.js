import axios from "axios";

export const getSearchResults = async (accessToken, searchQuery, category) => {
	const response = await axios.get(
		`https://api.spotify.com/v1/search?q=${searchQuery}&type=${category}`,
		{
			headers: {
				Authorization: "Bearer " + accessToken
			}
		}
	);
	return await response.data;
};
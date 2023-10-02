import { useEffect, useRef, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";

export const Search = ({ token }) => {
	const spotifyApi = new SpotifyWebApi({
		clientId: "34b03478831b4560911d57f64b00b9ea"
	});
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const searchRef = useRef(null);

	useEffect(() => {
		if (!token) return;
		spotifyApi.setAccessToken(token);
	}, [token]);

	useEffect(() => {
		if (!search) return;
		setSearchResults([]);
		if (!token) return;

		spotifyApi.searchTracks(search).then((response) => {
			console.log(response);
		});
	}, [search, token]);

	return (
		<div className="bg-gradient-to-b from-gray-600 to-black h-[100vw] p-2">
			<input
				className="bg-[#242424] border-none border-gray-300 rounded-full py-2 px-8"
				placeholder="What are you looking for?"
			></input>
		</div>
	);
};

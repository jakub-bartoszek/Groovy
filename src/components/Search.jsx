import { useEffect, useRef, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";

export const Search = ({ token }) => {
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const spotifyApi = new SpotifyWebApi({
		clientId: "34b03478831b4560911d57f64b00b9ea"
	});

	useEffect(() => {
		if (!token) {
			return;
		} else {
			spotifyApi.setAccessToken(token);
		}
	}, [token, spotifyApi]);

	useEffect(() => {
		if (!search) {
			setSearchResults([]);
		} else {
			if (!token) {
				return;
			} else {
				spotifyApi.searchTracks(search).then((response) => response.body.tracks.items);
			}
		}
	}, [search, token]);

	return (
		<div className="bg-gradient-to-b from-gray-600 to-black h-[100vw] p-2">
			<input
				placeholder="szukaj"
				value={search}
				onChange={(event) => {
					setSearch(event.target.value);
					console.log(search);
				}}
			></input>
		</div>
	);
};

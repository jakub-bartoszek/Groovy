import SpotifyWebApi from "spotify-web-api-node";
import { Playlists } from "./Playlists";
import { useEffect, useRef, useState } from "react";

const spotifyApi = new SpotifyWebApi({
	clientId: "34b03478831b4560911d57f64b00b9ea"
});

export const Sidebar = ({ token }) => {
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
		<div className="flex flex-col gap-2">
			<div className="bg-red-900 rounded-xl px-6 py-4">
				<ul>
					<li>Home</li>
					<li>Search</li>
				</ul>
			</div>

			<Playlists />
		</div>
	);
};

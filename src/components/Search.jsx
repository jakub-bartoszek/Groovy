import { useEffect, useRef, useState } from "react";
import { spotifyApi } from "../utils/spotifyApi";
import { SearchIcon } from "../assets/search";
export const Search = ({ token }) => {
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		if (!token) {
			return;
		} else {
			spotifyApi.setAccessToken(token);
		}
	}, [token]);

	useEffect(() => {
		if (!search) {
			setSearchResults([]);
		} else {
			if (!token) {
				return;
			} else {
				spotifyApi.searchTracks(search).then((response) => {
					setSearchResults(response.body.tracks.items);
				});
			}
		}
	}, [search, token]);
	return (
		<div className="bg-gradient-to-b from-gray-600 to-black h-[100vw] p-2 rounded-xl">
			<div>
				<label
					className="flex items-center bg-[#242424] text-white rounded-full py-3 px-4
					hover:outline hover:outline-1 hover:outline-[#888888] hover:bg-[#2a2a2a]
					focus:outline focus:outline-2 focus:outline-white"
				>
					<SearchIcon />
					<input
						className="bg-transparent focus:outline-none pl-1 placeholder-[#888888]"
						placeholder="What are you looking for?"
						value={search}
						onChange={(event) => {
							setSearch(event.target.value);
							console.log(search);
						}}
					/>
				</label>
			</div>
			<div>
				<ul className="flex flex-col gap-2 py-2">
					{searchResults.map((track) => {
						return (
							<li
								className="flex text-white text-sm gap-2 hover:cursor-pointer hover:bg-[#ffffff20] p-2 rounded-xl transition"
								key={track.id}
							>
								<img
									className="h-10 w-10"
									alt="Track cover"
									src={track.album.images[0].url}
								></img>
								<div className="flex flex-col">
									<p className="font-bold">{track.name}</p>
									<p>{Object.values(track.album.artists)[0].name}</p>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

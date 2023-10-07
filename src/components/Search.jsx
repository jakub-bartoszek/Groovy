import { useEffect, useRef, useState } from "react";
import { spotifyApi } from "../utils/spotifyApi";
import { SearchIcon } from "../assets/search";
import axios from "axios";

export const Search = ({ token }) => {
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		if (token) {
			if (search) {
				const getSearchResults = async () => {
					const response = await axios.get(
						`https://api.spotify.com/v1/search?q=${search}&type=track`,
						{
							headers: {
								Authorization: "Bearer " + token
							}
						}
					);
					setSearchResults(response.data.tracks.items);
				};
				getSearchResults();
			}
		}
	}, [search, token]);

	return (
		<div>
			<div>
				<label
					className="flex items-center bg-[#242424] text-white rounded-full py-3 px-4
					hover:outline hover:outline-1 hover:outline-[#888888] hover:bg-[#2a2a2a]
					focus:outline focus:outline-2 focus:outline-white"
				>
					<SearchIcon height={20} width={20} />
					<input
						className="bg-transparent focus:outline-none pl-1 placeholder-[#888888]"
						placeholder="What are you looking for?"
						value={search}
						onChange={(event) => {
							setSearch(event.target.value);
						}}
					/>
				</label>
			</div>
			<div>
				<ul className="flex flex-col gap-2 py-2">
					{searchResults.map((track) => {
						return (
							<li
								key={track.id}
								className="flex text-white text-sm gap-2 hover:cursor-pointer hover:bg-[#ffffff20] p-2 rounded-xl transition"
							>
								<img
									alt="Album cover"
									src={
										track.album.images[track.album.images.length - 1]
											.url
									}
								></img>
								<div className="flex flex-col">
									<p className="font-bold">{track.name}</p>
									<p>{track.artists[0].name}</p>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

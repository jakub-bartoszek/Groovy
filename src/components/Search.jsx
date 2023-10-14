import { useEffect, useState } from "react";
import { SearchIcon } from "../assets/search";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../utils/spotifyDataSlice";
import { LeftArrowIcon } from "../assets/left-arrow";
import { NavLink } from "react-router-dom";

export const Search = ({ token }) => {
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const dispatch = useDispatch();

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
			} else {
				setSearchResults([]);
			}
		}
	}, [search, token]);

	return (
		<div className="flex flex-col h-[100%] overflow-y-scroll rounded-xl bg-[#121212] p-4 bg-gradient-to-b from-slate-600">
			<div className="flex items-center gap-3">
				<NavLink to="/home">
					<div className="bg-black rounded-full flex items-center justify-center p-1 text-white">
						<LeftArrowIcon />
					</div>
				</NavLink>
				<label
					className=" h-10 flex items-center bg-[#242424] text-white rounded-full py-3 pl-2 pr-4 sticky top-0
					hover:bg-[#2a2a2a] focus-within:outline focus-within:outline-2"
				>
					<SearchIcon
						height={20}
						width={20}
					/>
					<input
						className="bg-transparent focus:outline-none pl-1 placeholder-[#888888] w-full"
						placeholder="What are you looking for?"
						value={search}
						onChange={(event) => {
							setSearch(event.target.value);
						}}
					/>
				</label>
			</div>
			<ul className="mt-10">
				{searchResults.map((track) => {
					return (
						<li
							onClick={() => {
								dispatch(setCurrentTrack(track.uri));
							}}
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
	);
};

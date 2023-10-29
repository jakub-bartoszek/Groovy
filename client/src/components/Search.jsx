import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "../assets/icons/search";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../utils/spotifyDataSlice";
import { LeftArrowIcon } from "../assets/icons/left-arrow";
import { NavLink } from "react-router-dom";
import { AccountBar } from "./AccountBar";
import { CategoryButton } from "./CategoryButton";
import { CrossIcon } from "../assets/icons/cross";
import { RightArrowIcon } from "../assets/icons/right-arrow";

export const Search = ({ token }) => {
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState();
	const [category, setCategory] = useState("track");

	const dispatch = useDispatch();
	const contentWrapper = useRef(null);
	const [scrollPosition, setScrollPosition] = useState("left");

	useEffect(() => {
		if (token) {
			if (search) {
				const getSearchResults = async () => {
					const response = await axios.get(
						`https://api.spotify.com/v1/search?q=${search}&type=${category}`,
						{
							headers: {
								Authorization: "Bearer " + token
							}
						}
					);
					setSearchResults(response.data);
				};
				getSearchResults();
			} else {
				setSearchResults([]);
			}
		}
	}, [search, token, category]);

	return (
		<div className="h-full overflow-hidden relative rounded-md text-white flex flex-col bg-[#121212]">
			<AccountBar
				bgColor={{
					R: 18,
					G: 18,
					B: 18,
					A: 1
				}}
				opacity={1}
				searchInput={
					<label className="pl-2 pr-4 h-12 flex items-center bg-[#242424] text-white rounded-full sticky top-0 hover:bg-[#2a2a2a] focus-within:outline focus-within:outline-2">
						<SearchIcon size={20} />
						<input
							className="pl-2 h-8 bg-transparent focus:outline-none placeholder-[#888888] w-full"
							placeholder="What are you looking for?"
							value={search}
							onChange={(event) => {
								setSearch(event.target.value);
							}}
						/>
					</label>
				}
			/>

			<div
				className="gap-2 py-2 px-4 flex overflow-x-scroll items-center hide-scrollbar scroll-smooth sticky top-[72px]"
				ref={contentWrapper}
			>
				<CategoryButton
					category={category}
					setCategory={setCategory}
					name={"Artist"}
				/>
				<CategoryButton
					category={category}
					setCategory={setCategory}
					name={"Track"}
				/>
			</div>
			{category === "track" && searchResults && (
				<ul className="h-full overflow-y-scroll mt-[72px]">
					{searchResults.tracks?.items.map((track) => (
						<li
							key={track.id}
							className="flex items-center gap-4 p-2 hover:bg-[#ffffff33] rounded-md"
						>
							<img
								className="w-12 h-12 rounded-md"
								src={
									track.album.images[track.album.images.length - 1]
										.url
								}
								alt={track.name}
							/>
							<div className="flex flex-col">
								<p>{track.name}</p>
								<p>{track.artists[0].name}</p>
							</div>
						</li>
					))}
				</ul>
			)}
			{category === "artist" && searchResults && (
				<ul className="h-full overflow-y-scroll mt-[72px] grid grid-cols-4 gap-4 p-4">
					{searchResults.artists?.items.map((artist) => (
						<li
							key={artist.id}
							className="flex flex-col gap-4 p-8 bg-[#181818] rounded-md"
						>
							<div className="bg-black min-w-36 min-h-36 w-36 h-36 rounded-full self-center">
								<img
									className="h-full w-full shadow-2xl object-cover rounded-full"
									src={artist.images[0]?.url}
									alt="Liked songs"
									crossOrigin="Anonymous"
								/>
							</div>
							<div>
								<p>
									<b>{artist.name}</b>
								</p>
								<p className="text-sm">Artist</p>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

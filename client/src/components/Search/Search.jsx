import { useCallback, useEffect, useRef, useState } from "react";
import { CategoryButton } from "../common/CategoryButton";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchQuery } from "../../utils/redux/searchSlice";
import { nanoid } from "@reduxjs/toolkit";
import { setBgColor } from "../../utils/redux/colorsSlice";

export const Search = ({ accessToken, width }) => {
	const searchQuery = useSelector(selectSearchQuery);
	const [searchResults, setSearchResults] = useState();
	const [category, setCategory] = useState("track");
	const contentWrapper = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setBgColor({ R: 18, G: 18, B: 18 }));
	});

	useEffect(() => {
		if (accessToken) {
			if (searchQuery) {
				const getSearchResults = async () => {
					const response = await axios.get(
						`https://api.spotify.com/v1/search?q=${searchQuery}&type=${category}`,
						{
							headers: {
								Authorization: "Bearer " + accessToken
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
	}, [searchQuery, accessToken, category]);

	return (
		<div className="h-full overflow-hidden relative rounded-[10px] text-white flex flex-col bg-[#121212]">
			<div
				className="gap-2 p-4 flex overflow-x-scroll items-center hide-scrollbar scroll-smooth sticky top-[72px]"
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
				<ul className="h-full overflow-y-scroll mt-[72px] px-2">
					{searchResults.tracks?.items.map((track) => (
						<li
							className="flex items-center gap-4 p-2 hover:bg-[#ffffff33] rounded-[10px] overflow-hidden"
							key={nanoid()}
						>
							<img
								className="w-12 h-12 rounded-[10px]"
								src={track.album.images[track.album.images.length - 1].url}
								alt={track.name}
							/>
							<div className="flex flex-col overflow-hidden">
								<span className="text-ellipsis whitespace-nowrap overflow-hidden font-semibold">
									{track.name}
								</span>
								<span className="text-ellipsis whitespace-nowrap overflow-hidden text-muted">
									{track.artists[0].name}
								</span>
							</div>
						</li>
					))}
				</ul>
			)}
			{category === "artist" && searchResults && (
				<ul
					className={`h-full overflow-y-scroll mt-[72px] grid gap-4 p-4
					${width >= 1650 && "grid-cols-9"}
					${width < 1650 && width >= 1550 && "grid-cols-8"}
					${width < 1550 && width >= 1450 && "grid-cols-7"}
					${width < 1450 && width >= 1350 && "grid-cols-6"}
					${width < 1350 && width >= 1250 && "grid-cols-5"}
					${width < 1250 && width >= 1050 && "grid-cols-4"}
					${width < 1050 && width >= 700 && "grid-cols-3"}
					${width < 700 && width >= 500 && "grid-cols-2"}`}
				>
					{searchResults.artists?.items.map((artist) => (
						<li
							className="flex flex-col gap-4 p-8 bg-[#181818] rounded-[10px]"
							key={nanoid()}
						>
							<div className="bg-black min-w-36 min-h-36 w-36 h-36 rounded-full self-center">
								<img
									className="h-full w-full shadow-2xl object-cover rounded-full"
									src={artist.images[0]?.url}
									alt="Liked songs"
									crossOrigin="Anonymous"
								/>
							</div>
							<div className={`flex flex-col ${width < 500 && "items-center"}`}>
								<span>
									<b>{artist.name}</b>
								</span>
								<span className="text-sm">Artist</span>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

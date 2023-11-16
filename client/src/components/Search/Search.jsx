import { useEffect, useRef, useState } from "react";
import { CategoryButton } from "../common/CategoryButton";
import { Loader } from "../../assets/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchSearchResults,
	selectSearchQuery,
	selectSearchResults,
	selectStatus
} from "../../utils/redux/searchSlice";
import { nanoid } from "@reduxjs/toolkit";
import { setBgColor } from "../../utils/redux/colorsSlice";

export const Search = ({ accessToken, width }) => {
	const searchQuery = useSelector(selectSearchQuery);
	const searchResults = useSelector(selectSearchResults);
	const status = useSelector(selectStatus);
	const [category, setCategory] = useState("track");
	const contentWrapper = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setBgColor({ R: 18, G: 18, B: 18 }));
	});

	useEffect(() => {
		if (accessToken && searchQuery && category) {
			dispatch(
				fetchSearchResults({
					accessToken: accessToken,
					searchQuery: searchQuery,
					category: category
				})
			);
		}
	}, [dispatch, searchQuery, accessToken, category]);

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
			{
				{
					loading: (
						<div className="h-full flex items-center justify-center">
							<Loader />
						</div>
					),
					error: <>Error</>,
					success: (
						<>
							{
								{
									track: (
										<ul className="h-full overflow-y-scroll mt-[72px] px-2">
											{searchResults.tracks?.items.length > 0 ? (
												<>
													{searchResults.tracks?.items.map((track) => (
														<li
															className="flex items-center gap-4 p-2 hover:bg-[#ffffff33] rounded-[10px] overflow-hidden"
															key={nanoid()}
														>
															<img
																className="w-12 h-12 rounded-[10px]"
																src={
																	track.album.images[
																		track.album.images.length - 1
																	].url
																}
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
												</>
											) : (
												<span className="text-muted">No tracks found...</span>
											)}
										</ul>
									),
									artist: (
										<ul className="h-full overflow-y-scroll mt-[72px] gap-4 p-4 grid grid-cols-[repeat(auto-fit,_minmax(170px,_1fr))]">
											{searchResults.artists?.items.length > 0 ? (
												<>
													{searchResults.artists?.items.map((artist) => (
														<li
															className="flex flex-col gap-4 p-8 bg-[#181818] rounded-[10px] aspect-[16/23]"
															key={nanoid()}
														>
															<div className="bg-black rounded-full self-center w-32 h-32 ">
																<img
																	className="h-full w-full shadow-2xl object-cover rounded-full"
																	src={artist.images[0]?.url}
																	alt="Liked songs"
																	crossOrigin="Anonymous"
																/>
															</div>
															<div className="flex flex-col overflow-hidden">
																<span className="overflow-hidden text-ellipsis  whitespace-nowrap">
																	<b>{artist.name}</b>
																</span>
																<span className="text-sm text-muted">
																	Artist
																</span>
															</div>
														</li>
													))}
												</>
											) : (
												<span className="text-muted">No artists found...</span>
											)}
										</ul>
									)
								}[category]
							}
						</>
					)
				}[status]
			}
		</div>
	);
};

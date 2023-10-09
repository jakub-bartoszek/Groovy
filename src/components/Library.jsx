import { useRef, useState } from "react";
import { Playlists } from "./Playlists";
import { LeftArrowIcon } from "../assets/left-arrow";
import { RightArrowIcon } from "../assets/right-arrow";
import { StyledButton } from "./StyledButton";
import { TopArtists, TopItems } from "./TopArtists";
import { TopTracks } from "./TopTracks";
import {
	selectLibraryCategory,
	setLibraryCategory
} from "../utils/spotifyDataSlice";
import { useDispatch, useSelector } from "react-redux";

export const Library = () => {
	const contentWrapper = useRef(null);
	const [scrollPosition, setScrollPosition] = useState("left");
	const libraryCategory = useSelector(selectLibraryCategory);
	const dispatch = useDispatch();

	return (
		<div className="bg-[#121212] text-white rounded-xl flex flex-col h-[100%]">
			<div className="font-bold mb-3 p-4">Library</div>
			<div className="relative flex items-center mx-4">
				<button
					className={`bg-[#242424] rounded-full p-1 absolute left-0 shadow-left z-10 ${
						scrollPosition === "left" ? "hidden" : ""
					}`}
					onClick={() => {
						setScrollPosition("left");
						contentWrapper.current.scrollLeft -= 1000;
					}}
				>
					<LeftArrowIcon />
				</button>
				<button
					className={`bg-[#242424] rounded-full p-1 absolute right-0 shadow-right z-10 ${
						scrollPosition === "right" ? "hidden" : ""
					}`}
					onClick={() => {
						setScrollPosition("right");
						contentWrapper.current.scrollLeft += 1000;
					}}
				>
					<RightArrowIcon />
				</button>
				<div
					className="gap-2 overflow-x-scroll hide-scrollbar scroll-smooth grid grid-flow-col"
					ref={contentWrapper}
				>
					{libraryCategory !== "All" ? (
						<button
							onClick={() => dispatch(setLibraryCategory("All"))}
							className="bg-black h-8 w-8 flex items-center justify-center rounded-full"
						>
							a
						</button>
					) : null}
					{libraryCategory === "Playlists" ||
					libraryCategory === "All" ? (
						<StyledButton name="Playlists" />
					) : null}
					{libraryCategory === "Artists" ||
					libraryCategory === "All" ? (
						<StyledButton name="Artists" />
					) : null}
					{libraryCategory === "Tracks" ||
					libraryCategory === "All" ? (
						<StyledButton name="Tracks" />
					) : null}
					{libraryCategory === "Albums" ||
					libraryCategory === "All" ? (
						<StyledButton name="Albums" />
					) : null}
					{libraryCategory === "Podcasts" ||
					libraryCategory === "All" ? (
						<StyledButton name="Podcasts" />
					) : null}
				</div>
			</div>
			<div className="flex flex-col h-[100%] overflow-y-scroll p-2 rounded-xl">
				<ul className="grid grid-flow-row p-2 h-0">
					{libraryCategory === "Playlists" ||
					libraryCategory === "All" ? (
						<Playlists />
					) : null}
					{libraryCategory === "Artists" ||
					libraryCategory === "All" ? (
						<TopArtists />
					) : null}
					{libraryCategory === "Tracks" ||
					libraryCategory === "All" ? (
						<TopTracks />
					) : null}
				</ul>
			</div>
		</div>
	);
};

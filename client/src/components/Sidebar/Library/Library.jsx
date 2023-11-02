import React, { useRef, useState } from "react";
import { LibraryIcon } from "../../../assets/icons/library";
import { LeftArrowIcon } from "../../../assets/icons/left-arrow";
import { RightArrowIcon } from "../../../assets/icons/right-arrow";
import { CrossIcon } from "../../../assets/icons/cross";
import { CategoryButton } from "../../common/CategoryButton";
import { Playlists } from "./Playlists/Playlists";
import { TopTracks } from "./TopTracks/TopTracks";
import { TopArtists } from "./TopArtists/TopArtists";

export const Library = ({ width, accessToken }) => {
	const contentWrapper = useRef(null);
	const [libraryScrollPosition, setLibraryScrollPosition] =
		useState(0);
	const [scrollPosition, setScrollPosition] = useState("left");

	const [category, setCategory] = useState("all");

	const handleScroll = (event) => {
		setLibraryScrollPosition(event.currentTarget.scrollTop);
	};

	return (
		<div className="rounded-[10px] text-[#b3b3b3] bg-[#121212] h-full overflow-hidden flex flex-col">
			<h2
				className={`flex items-center gap-4 py-4 px-[19px] font-bold ${
					(width <= 70) & (libraryScrollPosition !== 0) &&
					"shadow-bottom"
				}`}
			>
				<div className="w-8 h-8 flex items-center justify-center">
					<LibraryIcon size={22} />
				</div>
				{width > 70 && <p>Library</p>}
			</h2>
			{width > 70 && (
				<div
					className={`relative flex items-center px-4 h-14 py-2 ${
						libraryScrollPosition !== 0 && "shadow-bottom"
					}`}
				>
					<button
						className={`bg-[#242424] flex items-center justify-center h-8 w-8 rounded-full absolute left-4 shadow-left ${
							scrollPosition === "left" ? "hidden" : ""
						} ${category !== "all" ? "hidden" : ""}`}
						onClick={() => {
							setScrollPosition("left");
							contentWrapper.current.scrollLeft -= 1000;
						}}
					>
						<LeftArrowIcon size={18} />
					</button>
					<button
						className={`bg-[#242424] flex items-center justify-center h-8 w-8 rounded-full absolute right-4 shadow-right ${
							scrollPosition === "right" ? "hidden" : ""
						} ${category !== "all" ? "hidden" : ""}`}
						onClick={() => {
							setScrollPosition("right");
							contentWrapper.current.scrollLeft += 1000;
						}}
					>
						<RightArrowIcon size={18} />
					</button>
					<div
						className="gap-2 h-8 overflow-x-scroll hide-scrollbar scroll-smooth grid grid-flow-col"
						ref={contentWrapper}
					>
						{category !== "all" ? (
							<button
								onClick={() => setCategory("all")}
								className="bg-[#242424] h-8 w-8 flex items-center justify-center rounded-full"
							>
								<CrossIcon size={18} />
							</button>
						) : null}
						{category === "playlists" ||
						category === "all" ? (
							<CategoryButton
								category={category}
								setCategory={setCategory}
								name="Playlists"
							/>
						) : null}
						{category === "artists" ||
						category === "all" ? (
							<CategoryButton
								category={category}
								setCategory={setCategory}
								name="Artists"
							/>
						) : null}
						{category === "tracks" ||
						category === "all" ? (
							<CategoryButton
								category={category}
								setCategory={setCategory}
								name="Tracks"
							/>
						) : null}
						{category === "albums" ||
						category === "all" ? (
							<CategoryButton
								category={category}
								setCategory={setCategory}
								name="Albums"
							/>
						) : null}
						{category === "podcasts" ||
						category === "all" ? (
							<CategoryButton
								category={category}
								setCategory={setCategory}
								name="Podcasts"
							/>
						) : null}
					</div>
				</div>
			)}
			<ul
				onScroll={handleScroll}
				className={`p-1 h-full overflow-y-scroll ${
					width <= 70 && "hide-scrollbar"
				}`}
			>
				{category === "playlists" ||
				category === "all" ? (
					<Playlists width={width} accessToken={accessToken} />
				) : null}
				{category === "tracks" || category === "all" ? (
					<TopTracks width={width} accessToken={accessToken}/>
				) : null}
				{category === "artists" ||
				category === "all" ? (
					<TopArtists width={width} accessToken={accessToken}/>
				) : null}
			</ul>
		</div>
	);
};

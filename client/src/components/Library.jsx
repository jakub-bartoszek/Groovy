import React, { useRef, useState } from "react";
import { LibraryIcon } from "../assets/icons/library";
import { LeftArrowIcon } from "../assets/icons/left-arrow";
import { RightArrowIcon } from "../assets/icons/right-arrow";
import { CrossIcon } from "../assets/icons/cross";
import { CategoryButton } from "./CategoryButton";
import { Playlists } from "./Playlists";
import { TopTracks } from "./TopTracks";
import { TopArtists } from "./TopArtists";

export const Library = ({ width }) => {
	const contentWrapper = useRef(null);
	const [libraryScrollPosition, setLibraryScrollPosition] =
		useState(0);
	const [scrollPosition, setScrollPosition] = useState("left");

	const [category, setCategory] = useState("All");

	const handleScroll = (event) => {
		setLibraryScrollPosition(event.currentTarget.scrollTop);
	};

	return (
		<div className="rounded-md text-[#b3b3b3] bg-[#121212] h-full overflow-hidden flex flex-col">
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
						} ${category !== "All" ? "hidden" : ""}`}
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
						} ${category !== "All" ? "hidden" : ""}`}
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
						{category !== "All" ? (
							<button
								onClick={() => setCategory("All")}
								className="bg-[#242424] h-8 w-8 flex items-center justify-center rounded-full"
							>
								<CrossIcon size={18} />
							</button>
						) : null}
						{category === "Playlists" ||
						category === "All" ? (
							<CategoryButton
								category={category}
								setCategory={setCategory}
								name="Playlists"
							/>
						) : null}
						{category === "Artists" ||
						category === "All" ? (
							<CategoryButton
								category={category}
								setCategory={setCategory}
								name="Artists"
							/>
						) : null}
						{category === "Tracks" ||
						category === "All" ? (
							<CategoryButton
								category={category}
								setCategory={setCategory}
								name="Tracks"
							/>
						) : null}
						{category === "Albums" ||
						category === "All" ? (
							<CategoryButton
								category={category}
								setCategory={setCategory}
								name="Albums"
							/>
						) : null}
						{category === "Podcasts" ||
						category === "All" ? (
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
				{category === "Playlists" ||
				category === "All" ? (
					<Playlists width={width} />
				) : null}
				{category === "Tracks" || category === "All" ? (
					<TopTracks />
				) : null}
				{category === "Artists" ||
				category === "All" ? (
					<TopArtists />
				) : null}
			</ul>
		</div>
	);
};

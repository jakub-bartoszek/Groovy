import { useEffect, useRef, useState } from "react";
import { Playlists } from "./Playlists";
import { LeftArrowIcon } from "../assets/left-arrow";
import { RightArrowIcon } from "../assets/right-arrow";
import { StyledButton } from "./StyledButton";
import { TopItems } from "./TopItems";

export const Library = () => {
	const contentWrapper = useRef(null);
	const [scrollPosition, setScrollPosition] = useState("left");

	return (
		<div className="bg-[#121212] text-white rounded-xl px-6 py-4">
			<div className="font-bold px-2 mb-3">Library</div>
			<div className="relative flex items-center">
				<div
					className={`absolute left-0 flex bg-gradient-to-r from-[#121212] w-24 ${
						scrollPosition === "left" ? "hidden" : ""
					}`}
				>
					<button
						className="bg-[#242424] rounded-full p-1"
						onClick={() => {
							setScrollPosition("left");
							contentWrapper.current.scrollLeft -= 1000;
						}}
					>
						<LeftArrowIcon />
					</button>
				</div>
				<div
					className={`absolute right-0 flex bg-gradient-to-l from-[#121212] w-24 justify-end ${
						scrollPosition === "right" ? "hidden" : ""
					}`}
				>
					<button
						className="bg-[#242424] rounded-full p-1"
						onClick={() => {
							setScrollPosition("right");
							contentWrapper.current.scrollLeft += 1000;
						}}
					>
						<RightArrowIcon />
					</button>
				</div>
				<div
					className="flex gap-2 overflow-x-scroll hide-scrollbar scroll-smooth"
					ref={contentWrapper}
				>
					<StyledButton>Playlists</StyledButton>
					<StyledButton>Artists</StyledButton>
					<StyledButton>Albums</StyledButton>
					<StyledButton>Tracks</StyledButton>
					<StyledButton>Podcasts</StyledButton>
				</div>
			</div>
			<ul className="gap-2 mt-10 flex flex-col">
				<Playlists />
				<TopItems />
			</ul>
		</div>
	);
};

import { useRef, useState } from "react";
import { Playlists } from "./Playlists";
import { LeftArrowIcon } from "../assets/left-arrow";
import { RightArrowIcon } from "../assets/right-arrow";
import { StyledButton } from "./StyledButton";
import { TopItems } from "./TopItems";

export const Library = () => {
	const contentWrapper = useRef(null);
	const [scrollPosition, setScrollPosition] = useState("left");

	return (
		<div className="bg-[#121212] text-white rounded-xl flex flex-col h-[100%]">
			<div className="font-bold mb-3 p-4">Library</div>
			<div className="relative flex items-center mx-4">
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
			<div className="h-[100%] overflow-auto mt-2">
				<ul className="flex flex-col h-[0] p-2">
					<Playlists />
					<TopItems />
				</ul>
			</div>
		</div>
	);
};

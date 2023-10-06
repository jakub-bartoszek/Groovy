import { useEffect, useRef, useState } from "react";
import { Playlists } from "./Playlists";
import { LeftArrowIcon } from "../assets/left-arrow";
import { RightArrowIcon } from "../assets/right-arrow";
import { StyledButton } from "./StyledButton";

export const Library = () => {
	const contentWrapper = useRef(null);
	const [scrollLeft, setScrollLeft] = useState(0);

	return (
		<div className="bg-[#121212] text-white rounded-xl px-6 py-4">
			<div className="font-bold px-2 mb-3">Library</div>
			<div className="relative items-center">
				<div
					className={`absolute left-0 bg-gradient-to-r from-[#121212] h-full w-28 opacity-${
						scrollLeft === 0 ? "0" : "70"
					}`}
				/>
				<button
					className={`${
						scrollLeft === 0 ? "hidden" : " "
					} absolute left-[0] bg-[#242424] rounded-full text-sm p-1 text-[#888888] hover:brightness-[1.4]`}
					onClick={() => {
						contentWrapper.current.scrollLeft = 0;
						setScrollLeft(0);
					}}
				>
					<LeftArrowIcon />
				</button>
				<div
					className={`absolute right-0 bg-gradient-to-l from-[#121212] h-full w-28 opacity-${
						scrollLeft === contentWrapper.current.scrollWidth
							? "0"
							: "70"
					}`}
				/>
				<button
					className={`${
						scrollLeft === contentWrapper.current.scrollWidth
							? "hidden"
							: " "
					} absolute right-[0] bg-[#242424] rounded-full text-sm p-1 text-[#888888] hover:brightness-[1.4]`}
					onClick={() => {
						contentWrapper.current.scrollLeft =
							contentWrapper.current.scrollWidth;
						setScrollLeft(contentWrapper.current.scrollWidth);
					}}
				>
					<RightArrowIcon className="text-white" />
				</button>
				<div
					className="flex gap-2 overflow-x-hidden scroll-smooth"
					ref={contentWrapper}
				>
					<StyledButton>Playlists</StyledButton>
					<StyledButton>Artists</StyledButton>
					<StyledButton>Albums</StyledButton>
					<StyledButton>Tracks</StyledButton>
					<StyledButton>Podcasts</StyledButton>
				</div>
			</div>
			<Playlists />
		</div>
	);
};

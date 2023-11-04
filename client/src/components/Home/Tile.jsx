import ColorThief from "colorthief/dist/color-thief.mjs";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../../utils/playerSlice";
import { setBgColor } from "../../utils/colorsSlice";

export const Tile = ({ track, name, imgSrc, width }) => {
	const dispatch = useDispatch();
	const imageRef = useRef();
	const colorThief = new ColorThief();

	return (
		<li
			className="cursor-pointer bg-white bg-opacity-10 rounded-[10px] relative"
			onClick={() => {
				track && dispatch(setCurrentTrack(track.track.uri));
			}}
		>
			<div
				className="aboslute flex items-center"
				onMouseEnter={() => {
					if (imageRef.current) {
						const img = imageRef.current;
						const R = colorThief.getColor(img)[0];
						const G = colorThief.getColor(img)[1];
						const B = colorThief.getColor(img)[2];
						dispatch(setBgColor({ R: R, G: G, B: B, A: 1 }));
					}
				}}
			>
				<img
					className="rounded-[10px] h-[64px] w-[64px] shadow-xl"
					ref={imageRef}
					src={track ? track.track.album.images[2].url : imgSrc}
					alt="Track cover"
					crossOrigin="Anonymous"
				/>
				<span className={`px-4 ${width < 800 && "text-sm"}`}>
					{track ? track.track.name : name}
				</span>
			</div>
		</li>
	);
};

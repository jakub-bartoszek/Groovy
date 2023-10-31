import ColorThief from "colorthief/dist/color-thief.mjs";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
	setBgColor,
	setCurrentTrack
} from "../utils/spotifyDataSlice";
import { nanoid } from "@reduxjs/toolkit";

export const Tile = ({ track, name, imgSrc, width }) => {
	const dispatch = useDispatch();
	const imageRef = useRef();
	const colorThief = new ColorThief();

	return (
		<div
			onClick={() => {
				track && dispatch(setCurrentTrack(track.track.uri));
			}}
			key={track ? track.track.id : nanoid()}
			className="cursor-pointer bg-white bg-opacity-10 rounded-md relative"
		>
			<div
				onMouseEnter={() => {
					const img = imageRef.current;
					const R = colorThief.getColor(img)[0];
					const G = colorThief.getColor(img)[1];
					const B = colorThief.getColor(img)[2];
					dispatch(setBgColor({ R: R, G: G, B: B, A: 1 }));
				}}
				className="aboslute flex items-center"
			>
				<img
					ref={imageRef}
					className="rounded-md h-[64px] shadow-xl"
					src={track ? track.track.album.images[2].url : imgSrc}
					alt="Track cover"
					crossOrigin="Anonymous"
				/>
				<p className={`px-4 ${width < 800 && "text-sm"}`}>{track ? track.track.name : name}</p>
			</div>
		</div>
	);
};

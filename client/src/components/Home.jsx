import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBgColor, setOpacity } from "../utils/spotifyDataSlice";
import { Tile } from "./Tile";

export const Home = ({ token, width }) => {
	const dispatch = useDispatch();
	const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState(
		[]
	);
	const bgColor = useSelector(selectBgColor);
	const scrollRef = useRef();
	const _ = require("lodash");

	const throttledScroll = useCallback(
		_.throttle(
			() => {
				dispatch(setOpacity(scrollRef.current.scrollTop / 300));
			},
			100,
			{ leading: false }
		),
		[setOpacity]
	);

	useEffect(() => {
		if (token) {
			const getRecentlyPlayedTracks = async () => {
				const response = await axios.get(
					`https://api.spotify.com/v1/me/player/recently-played?limit=5`,
					{
						headers: {
							Authorization: "Bearer " + token
						}
					}
				);
				setRecentlyPlayedTracks(response.data.items);
			};
			getRecentlyPlayedTracks();
		}
	}, [token]);

	return (
		<div className="h-full overflow-hidden relative rounded-md text-white">
			<div
				ref={scrollRef}
				onScroll={throttledScroll}
				className="text-white h-full overflow-y-scroll"
			>
				<div
					style={{
						backgroundImage: `linear-gradient(rgba(18, 18, 18, 0.7), #121212)`,
						backgroundColor: `rgba(${bgColor?.R}, ${bgColor?.G}, ${bgColor?.B}, 1)`,
						transition: "0.3s linear"
					}}
					className="pt-[72px] p-4 bg-red-500"
				>
					<h1 className=" text-3xl font-bold py-6">Hello! {width}</h1>
					<div
						className={`grid grid-cols-3 gap-4 font-semibold ${
							width < 700 && "grid-cols-2"
						} ${width < 500 && "grid-cols-1"}`}
					>
						<Tile
							width={width}
							name="Liked songs"
							imgSrc="https://misc.scdn.co/liked-songs/liked-songs-64.png"
						/>
						{recentlyPlayedTracks.map((track) => (
							<Tile
								width={width}
								track={track}
							/>
						))}
					</div>
				</div>
				<div className="bg-[#121212] h-full w-full"></div>
			</div>
		</div>
	);
};

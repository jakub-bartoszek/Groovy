import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectBgColor,
	selectOpacity,
	setBgColor,
	setOpacity
} from "../../utils/redux/colorsSlice";
import { PlaylistTracks } from "./PlaylistTracks";
import { PlayButton } from "../common/PlayButton";
import {
	fetchLikedSongs,
	selectLikedSongs
} from "../../utils/redux/playlistSlice";

export const LikedSongs = ({ accessToken, width }) => {
	const dispatch = useDispatch();
	const [queue, setQueue] = useState();
	const opacity = useSelector(selectOpacity);
	const bgColor = useSelector(selectBgColor);
	const likedSongs = useSelector(selectLikedSongs);
	const scrollRef = useRef();
	const _ = require("lodash");
	const [tracks, setTracks] = useState();

	const throttledScroll = useCallback(
		_.throttle(
			() => {
				dispatch(setOpacity(scrollRef.current.scrollTop / 400));
			},
			100,
			{ leading: false }
		),
		[setOpacity]
	);

	useEffect(() => {
		if (accessToken) {
			dispatch(fetchLikedSongs(accessToken));
		}
	}, [dispatch, accessToken]);

	useEffect(() => {
		if (likedSongs) {
			setQueue(likedSongs.map((track) => track.track.uri));
			setTracks(
				likedSongs.map((track, index) => {
					return {
						index: index + 1,
						id: track.track.id,
						name: track.track.name,
						artists: track.track.artists.map((artist) => artist.name),
						album: track.track.album.name,
						image:
							track.track.album.images[track.track.album.images.length - 1]
								?.url,
						duration: (track.track.duration_ms / 60000).toFixed(2).toString(),
						dateAdded: track.added_at,
						uri: track.track.uri
					};
				})
			);
		}
	}, [likedSongs]);

	return (
		<div className="h-full overflow-hidden relative rounded-[10px] text-white">
			<div
				className="h-full overflow-y-scroll bg-[#121212]"
				ref={scrollRef}
				onScroll={throttledScroll}
			>
				<div
					className={`w-full flex ${width > 550 ? "h-[350px]" : "h-[200px]"}`}
					style={{
						backgroundColor: `rgb(${bgColor.R}, ${bgColor.G}, ${bgColor.B})`,
						boxShadow: `0 0 200px 80px #000000aa, 0 0 200px 80px rgb(${bgColor.R}, ${bgColor.G}, ${bgColor.B})`
					}}
				>
					<div className="flex self-end gap-4 w-full p-5 bg-gradient-to-t from-[#00000070]">
						<div
							className={`bg-black ${width > 550 ? "h-48 w-48" : "h-24 w-24"}`}
						>
							<img
								className="h-full w-full shadow-2xl object-cover image"
								onLoad={() => {
									const R = 83;
									const G = 60;
									const B = 160;

									dispatch(setBgColor({ R: R, G: G, B: B }));
								}}
								src="https://misc.scdn.co/liked-songs/liked-songs-300.png"
								alt="Liked songs"
								crossOrigin="Anonymous"
							/>
						</div>
						<div className="flex flex-col justify-between">
							<span>Playlist</span>
							<div className="flex flex-col gap-4">
								<span
									className={`font-bold 
								${width >= 700 && "text-7xl"}
								${width < 700 && width > 550 && "text-5xl"}
								${width < 550 && "text-3xl"}`}
								>
									Liked songs
								</span>
							</div>
						</div>
					</div>
				</div>
				<PlayButton queue={queue} />
				<PlaylistTracks
					width={width}
					opacity={opacity}
					tracks={tracks}
				/>
			</div>
		</div>
	);
};

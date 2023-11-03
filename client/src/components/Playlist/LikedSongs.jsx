import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectBgColor,
	selectOpacity,
	setBgColor,
	setOpacity
} from "../../utils/spotifyDataSlice";
import { PlaylistTracks } from "./PlaylistTracks";
import { PlayButton } from "../common/PlayButton";

export const LikedSongs = ({ accessToken, width }) => {
	const dispatch = useDispatch();
	const [playlist, setPlaylist] = useState();
	const opacity = useSelector(selectOpacity);
	const bgColor = useSelector(selectBgColor);
	const [tracks, setTracks] = useState();
	const scrollRef = useRef();

	const _ = require("lodash");

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
		const getLikedTracks = async () => {
			const response = await axios.get(
				`https://api.spotify.com/v1/me/tracks`,
				{
					headers: {
						Authorization: "Bearer " + accessToken,
						"Content-Type": "application/json"
					}
				}
			);

			setPlaylist({
				queue: response.data.items.map((track) => track.track.uri)
			});

			setTracks(
				response.data.items.map((track, index) => {
					return {
						index: index + 1,
						id: track.track.id,
						name: track.track.name,
						artists: track.track.artists.map((artist) => artist.name),
						album: track.track.album.name,
						image:
							track.track.album.images[
								track.track.album.images.length - 1
							]?.url,
						duration: (track.track.duration_ms / 60000)
							.toFixed(2)
							.toString(),
						dateAdded: track.added_at,
						uri: track.track.uri
					};
				})
			);
		};

		getLikedTracks();
	}, [accessToken]);

	return (
		<div className="h-full overflow-hidden relative rounded-[10px] text-white">
			<div
				ref={scrollRef}
				onScroll={throttledScroll}
				className="h-full overflow-y-scroll bg-[#121212]"
			>
				<div
					className="w-full h-[350px] flex"
					style={{
						backgroundColor: `rgb(${bgColor.R}, ${bgColor.G}, ${bgColor.B})`,
						boxShadow: `0 0 200px 80px #000000aa, 0 0 200px 80px rgb(${bgColor.R}, ${bgColor.G}, ${bgColor.B})`
					}}
				>
					<div className="flex self-end gap-4 w-full p-5 bg-gradient-to-t from-[#00000070]">
						<div className="bg-black min-w-[190px] h-[190px] lg:h-[232px] lg:min-w-[232px]">
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
							<div>Playlist</div>
							<div className="flex flex-col gap-4">
								<span className="text-5xl lg:text-7xl font-bold">Liked songs</span>
							</div>
						</div>
					</div>
				</div>
				<PlayButton playlist={playlist} />
				<PlaylistTracks
					width={width}
					opacity={opacity}
					tracks={tracks}
				/>
			</div>
		</div>
	);
};

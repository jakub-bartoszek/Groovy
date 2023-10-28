import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { TrackList } from "./TrackList";
import { AccountBar } from "./AccountBar";

export const LikedTracks = ({ token }) => {
	const [tracks, setTracks] = useState();
	const [bgColor, setBgColor] = useState({
		R: 18,
		G: 18,
		B: 18,
		A: 0
	});
	const [playlistColor, setPlaylistColor] = useState("#121212");
	const imageRef = useRef();
	const scrollRef = useRef();
	const [opacity, setOpacity] = useState(0);

	const _ = require("lodash");

	const throttledScroll = useCallback(
		_.throttle(
			() => {
				setOpacity(scrollRef.current.scrollTop / 300);
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
						Authorization: "Bearer " + token,
						"Content-Type": "application/json"
					}
				}
			);
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
	}, [token]);

	return (
		<div className="h-full overflow-hidden relative rounded-md text-white">
			<AccountBar
				bgColor={bgColor}
				opacity={opacity}
			/>

			<div
				ref={scrollRef}
				onScroll={throttledScroll}
				className="h-full overflow-y-scroll bg-[#121212]"
			>
				<div
					className="w-full h-[350px] flex"
					style={{
						backgroundColor: playlistColor,
						boxShadow: `0 0 200px 80px #000000aa, 0 0 200px 80px ${playlistColor}`
					}}
				>
					<div className="flex self-end gap-4 w-full p-5 bg-gradient-to-t from-[#00000070]">
						<div className=" bg-black min-w-[190px] h-[190px] lg:h-[232px] lg:min-w-[232px]">
							<img
								className="h-full w-full shadow-2xl object-cover image"
								ref={imageRef}
								onLoad={() => {
									const img = imageRef.current;
									const R = 83;
									const G = 60;
									const B = 160;

									setBgColor({ R: R, G: G, B: B, A: 0 });
									setPlaylistColor(`rgb(${R}, ${G}, ${B})`);
								}}
								src="https://misc.scdn.co/liked-songs/liked-songs-300.png"
								alt="Liked songs"
								crossOrigin="Anonymous"
							/>
						</div>
						<div className="flex flex-col justify-between">
							<div>Playlist</div>
							<div className="flex flex-col gap-4">
								<p className="text-7xl font-bold">Liked songs</p>
							</div>
						</div>
					</div>
				</div>
				<TrackList
					opacity={opacity}
					tracks={tracks}
				/>
			</div>
		</div>
	);
};

// #533ca0
// https://misc.scdn.co/liked-songs/liked-songs-300.png

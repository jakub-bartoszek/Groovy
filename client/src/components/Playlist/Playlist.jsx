import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { PlaylistTracks } from "./PlaylistTracks";
import { useDispatch, useSelector } from "react-redux";
import { PlayButton } from "../common/PlayButton";
import {
	selectBgColor,
	selectOpacity,
	setBgColor,
	setOpacity
} from "../../utils/redux/colorsSlice";
import axios from "axios";
import ColorThief from "colorthief/dist/color-thief.mjs";
import MusicNoteIcon from "@heroicons/react/outline/MusicNoteIcon";

export const Playlist = ({ accessToken, width }) => {
	const dispatch = useDispatch();
	const opacity = useSelector(selectOpacity);
	const { id } = useParams();
	const [playlist, setPlaylist] = useState();
	const [tracks, setTracks] = useState();
	const imageRef = useRef();
	const bgColor = useSelector(selectBgColor);
	const colorThief = new ColorThief();
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
		if (scrollRef.current) {
			scrollRef.current.scrollTop = 0;
		}
	}, [id]);

	useEffect(() => {
		const getPlaylistItems = async () => {
			const response = await axios.get(
				`https://api.spotify.com/v1/playlists/${id}?limit=50`,
				{
					headers: {
						Authorization: "Bearer " + accessToken,
						"Content-Type": "application/json"
					}
				}
			);
			setPlaylist({
				id: response.data.id,
				name: response.data.name,
				owner: response.data.owner.display_name,
				ownerId: response.data.owner.id,
				image:
					response.data.images.length === 0
						? null
						: response.data.images[0].url,
				followersCount: response.data.followers.total,
				tracksCount: response.data.tracks.total,
				queue: response.data.tracks.items.map((track) => track.track.uri)
			});

			setTracks(
				response.data.tracks.items.map((track, index) => {
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
		};

		getPlaylistItems();
	}, [accessToken, id]);

	return (
		<div className="h-full overflow-hidden relative rounded-[10px] text-white">
			{playlist && (
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
								className={`bg-[#282828] relative flex items-center justify-center ${
									width > 550 ? "h-48 w-48" : "h-24 w-24"
								}`}
							>
								<MusicNoteIcon className="w-20 text-muted" />
								{playlist.image && (
									<img
										className="h-full w-full shadow-2xl object-cover absolute top-0"
										ref={imageRef}
										onLoad={() => {
											const img = imageRef.current;
											const R = colorThief.getColor(img)[0];
											const G = colorThief.getColor(img)[1];
											const B = colorThief.getColor(img)[2];

											dispatch(setBgColor({ R: R, G: G, B: B, A: 0 }));
										}}
										src={playlist.image}
										alt="Liked songs"
										crossOrigin="Anonymous"
									/>
								)}
							</div>
							<div className="flex flex-col justify-between overflow-hidden">
								<div>Playlist</div>
								<div className="flex flex-col gap-4 overflow-hidden">
									<span
										className={`font-bold 
								${width >= 700 && "text-7xl"}
								${width < 700 && width > 550 && "text-5xl"}
								${width < 550 && "text-3xl"}`}
									>
										{playlist.name}
									</span>
									<div className="flex items-center gap-2">
										<span className="text-sm">
											<b>{playlist.owner}</b>
											{` • ${playlist.tracksCount} tracks`}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					{tracks.length > 0 ? (
						<>
							<PlayButton playlist={playlist} />
							<PlaylistTracks
								width={width}
								opacity={opacity}
								tracks={tracks}
							/>
						</>
					) : (
						<div className="flex justify-center p-10 text-muted">
							No tracks yet...
						</div>
					)}
				</div>
			)}
		</div>
	);
};

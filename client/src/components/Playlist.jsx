import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { TrackList } from "./TrackList";
import ColorThief from "colorthief/dist/color-thief.mjs";
import {AccountBar} from "./AccountBar";

export const Playlist = ({ token }) => {
	const { id } = useParams();
	const [playlist, setPlaylist] = useState();
	const [tracks, setTracks] = useState();
	const [ownerImage, setOwnerImage] = useState("");
	const [bgColor, setBgColor] = useState({
		R: 18,
		G: 18,
		B: 18,
		A: 0
	});
	const [playlistColor, setPlaylistColor] = useState("#121212");
	const imageRef = useRef();

	const colorThief = new ColorThief();
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
		const getPlaylistItems = async () => {
			const response = await axios.get(
				`https://api.spotify.com/v1/playlists/${id}?limit=50`,
				{
					headers: {
						Authorization: "Bearer " + token,
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
				tracksCount: response.data.tracks.total
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

		getPlaylistItems();
	}, [token, id]);

	useEffect(() => {
		const getOwner = async () => {
			const response = await axios.get(
				`https://api.spotify.com/v1/users/${playlist.ownerId}`,
				{
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json"
					}
				}
			);
			setOwnerImage(response.data.images[0].url)
		};
		if (playlist) {
			getOwner();
		}
	}, [playlist, token])

	return (
		<div className="h-full overflow-hidden relative rounded-md text-white">
		<AccountBar
			bgColor={bgColor}
			opacity={opacity}
		/>
		{playlist && (
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
							{playlist.image && (
								<img
									className="h-full w-full shadow-2xl object-cover image"
									ref={imageRef}
									onLoad={() => {
										const img = imageRef.current;
										const R = colorThief.getColor(img)[0];
										const G = colorThief.getColor(img)[1];
										const B = colorThief.getColor(img)[2];

										setBgColor({ R: R, G: G, B: B, A: 0 });
										setPlaylistColor(`rgb(${R}, ${G}, ${B})`);
									}}
									src={playlist.image}
									alt="Liked songs"
									crossOrigin="Anonymous"
								/>
							)}
						</div>
						<div className="flex flex-col justify-between">
							<div>Playlist</div>
							<div className="flex flex-col gap-4">
								<p className="text-7xl font-bold">
									{playlist.name}
								</p>
								<div className="flex items-center gap-2">
									<img
									alt={playlist.owner}
										className="rounded-full h-6"
										src={ownerImage}
									/>
									<p className="text-sm">
										<b>{playlist.owner}</b>
										{` • ${playlist.tracksCount} tracks`}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<TrackList
					opacity={opacity}
					tracks={tracks}
				/>
			</div>
		)}
	</div>
);
}

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { TrackList } from "./TrackList";
import ColorThief from "colorthief/dist/color-thief.mjs";

export const Playlist = ({ token }) => {
	const { id } = useParams();
	const [tracks, setTracks] = useState([]);
	const [playlist, setPlaylist] = useState({});
	const imageRef = useRef();
	const [bgColor, setBgColor] = useState("#121212");

	const colorThief = new ColorThief();

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
				name: response.data.name,
				owner: response.data.owner.display_name,
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
						trackName: track.track.name,
						albumName: track.track.album.name,
						artists: track.track.artists.map((artist) => artist.name),
						image:
							track.track.album.images.length === 0
								? null
								: track.track.album.images[0].url,
						uri: track.track.uri
					};
				})
			);
		};

		getPlaylistItems();
	}, [token, id]);

	return (
		<div className="h-full w-full overflow-y-auto overflow-x-hidden text-white bg-[#121212]">
			{playlist ? (
				<>
					<div
						className="w-full h-[350px] flex"
						style={{
							backgroundColor: bgColor,
							boxShadow: `0 0 400px 80px ${bgColor}`
						}}
					>
						<div className="flex self-end gap-4 w-full p-4 bg-gradient-to-t from-[#00000070]">
							{playlist.image ? (
								<div className="w-[232px] h-[232px] 2xl:w-[190px] 2xl:h-[190px]">
									<img
										ref={imageRef}
										onLoad={() => {
											const img = imageRef.current;
											const R = colorThief.getColor(img)[0];
											const G = colorThief.getColor(img)[1];
											const B = colorThief.getColor(img)[2];
											setBgColor(`rgba(${R} ,${G}, ${B}, 0.5)`);
										}}
										className="h-full w-full shadow-2xl object-cover image"
										src={playlist.image}
										alt="Liked songs"
										crossOrigin="Anonymous"
									/>
								</div>
							) : (
								<div className="w-[232px] h-[232px] 2xl:w-[190px] 2xl:h-[190px] bg-black" />
							)}
							<div className="flex flex-col justify-between">
								<div>Playlist</div>
								<div className="flex flex-col gap-4">
									<p className="text-5xl font-bold">
										{playlist.name}
									</p>
									<p className="mb-0">{`${playlist.owner} • ${playlist.tracksCount} tracks`}</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col p-4 mt-12 ">
						<TrackList tracks={tracks} />
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

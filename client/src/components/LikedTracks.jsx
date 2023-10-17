import axios from "axios";
import { useEffect, useState } from "react";
import { TrackList } from "./TrackList";

export const LikedTracks = ({ token }) => {
	const [tracks, setTracks] = useState([]);

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
						trackName: track.track.name,
						albumName: track.track.album.name,
						artists: track.track.artists.map((artist) => artist.name),
						image: track.track.album.images[2].url,
						uri: track.track.uri
					};
				})
			);
		};

		getLikedTracks();
	}, [token]);

	return (
		<div className="h-full w-full overflow-y-auto overflow-x-hidden text-white bg-[#121212]">
			<div
				className="w-full h-[350px] flex bg-[#533ca0]"
				style={{
					boxShadow: `0 0 400px 80px #533ca0`
				}}
			>
				<div className="flex self-end gap-4 w-full p-4 bg-gradient-to-t from-[#00000070]">
					<div className="w-[232px] h-[232px] 2xl:w-[190px] 2xl:h-[190px]">
						<img
							src="https://misc.scdn.co/liked-songs/liked-songs-300.png"
							alt="Liked songs"
						/>
					</div>

					<div className="flex">
						<div className="self-end">
							<div>Playlist</div>
							<p className="text-5xl font-bold">Liked songs</p>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col p-4 mt-12 ">
				<TrackList tracks={tracks} />
			</div>
		</div>
	);
};

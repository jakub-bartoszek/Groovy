import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../utils/spotifyDataSlice";
import { TrackList } from "./TableWithTracks";

export const LikedTracks = ({ token }) => {
	const [tracks, setTracks] = useState([]);
	const dispatch = useDispatch();

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
		<div className="flex flex-col h-[100%] overflow-y-scroll rounded-xl bg-[#121212]">
			<div className="text-white bg-[#121212]">
				<div className="w-full h-[400px] bg-gradient-to-b from-[#533ca0] to-[#121212] flex p-4">
					<div className="self-end flex gap-4">
						<img
							className="max-h-64 max-w-64 shadow-2xl"
							src="https://misc.scdn.co/liked-songs/liked-songs-300.png"
							alt="Liked tracks"
						/>
						<div className="self-end flex flex-col gap-4">
							<p>Playlist</p>
							<p className=" text-5xl font-bold">Liked tracks</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col p-4 mt-12 ">
					<div className="grid grid-cols-[5%_60%_35%] border-b border-[#333333] mb-2">
						<div className="flex items-center justify-center">#</div>
						<div>Title</div>
						<div>Album</div>
					</div>
					<TrackList tracks={tracks} />
				</div>
			</div>
		</div>
	);
};

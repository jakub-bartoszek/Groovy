import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setCurrentTrack } from "../utils/spotifyDataSlice";

export const Playlist = ({ token }) => {
	const { id } = useParams();
	const [songs, setSongs] = useState([]);
	const [playlist, setPlaylist] = useState({});
	const dispatch = useDispatch();
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

			setSongs(
				response.data.tracks.items.map((song, index) => {
					return {
						index: index + 1,
						trackName: song.track.name,
						albumName: song.track.album.name,
						artists: song.track.artists.map((artist) => artist.name),
						image:
							song.track.album.images.length === 0
								? null
								: song.track.album.images[0].url,
						uri: song.track.uri
					};
				})
			);
		};

		getPlaylistItems();
	}, [token, id]);

	return (
		<div className="flex flex-col h-[100%] overflow-y-scroll rounded-xl bg-[#121212]">
			<div className="text-white bg-[#121212]">
				<div
					className={`w-full h-[400px] bg-gradient-to-b from-[#533ca0] to-[#121212] flex p-4`}
				>
					<div className="self-end flex gap-4">
						{playlist.image ? (
							<img
								className="w-64 h-64 shadow-2xl object-cover image"
								src={playlist.image}
								alt="Liked songs"
							/>
						) : (
							<div className="w-64 h-64 shadow-2xl bg-black" />
						)}
						<div className="self-end flex flex-col gap-4">
							<p>Playlist</p>
							<p className=" text-5xl font-bold">{playlist.name}</p>
							<p>{`${playlist.owner} • ${playlist.tracksCount} tracks`}</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col p-4 mt-12 ">
					<div className="grid grid-cols-[5%_60%_35%] border-b border-[#333333] mb-2 text-muted">
						<div className="flex items-center justify-center">#</div>
						<div>Title</div>
						<div>Album</div>
					</div>
					{songs.map((song) => {
						return (
							<div
								onClick={() => dispatch(setCurrentTrack(song.uri))}
								key={nanoid()}
								className="grid grid-cols-[5%_60%_35%] cursor-pointer hover:bg-[#ffffff10] py-2 rounded-md"
							>
								<div className="flex items-center justify-center">
									{song.index}
								</div>
								<div className="flex gap-4 items-center">
									{song.image ? (
										<img
											className="h-[50px]"
											alt="Song cover"
											src={song.image}
										/>
									) : (
										<div className="h-[50px] w-[50px] bg-black"></div>
									)}
									<div className="overflow-hidden">
										<p className="font-bold text-ellipsis whitespace-nowrap overflow-hidden">
											{song.trackName}
										</p>
										<p className="text-muted text-ellipsis whitespace-nowrap overflow-hidden">
											{song.artists.join(", ")}
										</p>
									</div>
								</div>
								<div className="text-ellipsis whitespace-nowrap overflow-hidden flex items-center">
									{song.albumName}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

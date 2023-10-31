import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "../utils/spotifyDataSlice";
import { NavLink } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import MusicNoteIcon from "@heroicons/react/outline/MusicNoteIcon";

export const Playlists = ({ width }) => {
	const token = useSelector(selectToken);
	const [playlists, setPlaylists] = useState([]);

	useEffect(() => {
		const getPlaylist = async () => {
			const response = await axios.get(
				`https://api.spotify.com/v1/me/playlists/`,
				{
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json"
					}
				}
			);
			const items = response.data.items;
			setPlaylists(items);
		};

		getPlaylist();
	}, [token]);

	return (
		<>
			<li key={nanoid()}>
				<NavLink to="/liked">
					<div className="flex items-center gap-3 hover:bg-[#1a1a1a] rounded-md p-2 playlist">
						<img
							src="https://misc.scdn.co/liked-songs/liked-songs-64.png"
							alt="Liked songs"
							className="h-12 w-12 rounded-md"
						></img>
						<p className="text-white font-semibold">Liked songs</p>
					</div>
				</NavLink>
			</li>
			{playlists.map((playlist) => (
				<li key={playlist.id}>
					<NavLink to={`/playlists/${playlist.id}`}>
						<div
							className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer playlist ${
								width <= 70 && "justify-center"
							}`}
						>
							{playlist.images[0] ? (
								<img
									alt={playlist.name}
									className="h-11 w-11 rounded-[4px]"
									src={
										playlist.images[playlist.images.length - 1]?.url
									}
								/>
							) : (
								<div className="h-11 w-11 rounded-[4px] bg-[#282828] flex items-center justify-center">
									<MusicNoteIcon className="w-6" />
								</div>
							)}
							{width > 70 && (
								<div>
									<p className="font-semibold text-white">
										{playlist.name}
									</p>
									<p className=" text-sm">
										Playlist • {playlist.owner.display_name}
									</p>
								</div>
							)}
						</div>
					</NavLink>
				</li>
			))}
		</>
	);
};

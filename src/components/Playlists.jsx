import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
	selectPlaylists,
	selectToken
} from "../utils/spotifyDataSlice";

export const Playlists = () => {
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
			{playlists.map((playlist) => {

				return (
					<li
						key={playlist.id}
						className="flex items-center gap-3"
					>
						{playlist.images.length !== 0 ? (
							<img
								className="h-12 w-12 rounded-s"
								alt="playlist cover"
								src={playlist.images[0].url}
							/>
						) : (
							<div className="bg-black h-12 w-12 rounded-s" />
						)}

						<div>
							<p className=" font-bold">{playlist.name}</p>
							<p className="text-sm text-[#a4a4a4]">Playlista • {playlist.owner.display_name}</p>
						</div>
					</li>
				);
			})}
		</>
	);
};

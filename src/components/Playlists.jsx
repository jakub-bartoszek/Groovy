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
			const { items } = response.data;
			console.log(items);

			const playlists = items.map(({ name, id, images, owner }) => {
				return { name, id, images, owner };
			});

			setPlaylists(playlists);
		};

		getPlaylist();
	}, [token]);

	useEffect(() => {
		const getTopItems = async () => {
			const response = await axios.get(
				`https://api.spotify.com/v1/me/top/tracks/`,
				{
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json"
					}
				}
			);
			const { items } = response.data;
		
		};

		getTopItems();
	}, [token]);

	return (
		
			<ul className=" gap-2 flex flex-col mt-10">
				{playlists.map((playlist) => {
					try {
						return (
							<li
								className="flex items-center gap-3"
								key={playlist.id}
							>
								<img
									className="h-12 w-12 rounded-md "
									alt="Playlist cover"
									src={Object.values(playlist.images[0])[1]}
								></img>
								<div>
									<p className=" text-lg">{playlist.name}</p>
									<p className=" text-gray-300 text-sm">
										{Object.values(playlist.owner)[0]}
									</p>
								</div>
							</li>
						);
					} catch (error) {
						return (
							<li
								className="flex items-center gap-3"
								key={playlist.id}
							>
								<div className="h-12 w-12 rounded-md bg-black"></div>
								<div>
									<p className=" text-lg">{playlist.name}</p>
									<p className=" text-gray-300 text-sm">
										{Object.values(playlist.owner)[0]}
									</p>
								</div>
							</li>
						);
					}
				})}
			</ul>
	);
};

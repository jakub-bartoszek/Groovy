import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
	selectPlaylists,
	selectToken
} from "../utils/spotifyDataSlice";
import { setPlaylists } from "../utils/spotifyDataSlice";

export const Playlists = () => {
	const token = useSelector(selectToken);
	const dispatch = useDispatch();
	const playlists = useSelector(selectPlaylists);

	useEffect(() => {
		const getPlaylistData = async () => {
			const response = await axios.get(
				"https://api.spotify.com/v1/me/playlists",
				{
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json"
					}
				}
			);
			const { items } = response.data;
			const playlists = items.map(({ name, id, images }) => {
				return { name, id, images };
			});

			dispatch(setPlaylists(playlists));
		};
		getPlaylistData();
	}, [token, dispatch]);

	return (
		<div className=" bg-[#121212] text-white rounded-xl px-6 py-4">
			<ul className=" gap-2 flex flex-col">
				{playlists.map((playlist) => {
					try {
						return (
							<li
								className="flex flex items-center gap-3"
								key={playlist.id}
							>
								<img
									className="h-12 w-12 rounded-md "
									alt="Playlist cover"
									src={Object.values(playlist.images[0])[1]}
								></img>
								{playlist.name}
							</li>
						);
					} catch (error) {
						return (
							<li
								className="flex flex items-center gap-3"
								key={playlist.id}
							>
								<div className="h-12 w-12 rounded-md bg-black"></div>
								{playlist.name}
							</li>
						);
					}
				})}
			</ul>
		</div>
	);
};

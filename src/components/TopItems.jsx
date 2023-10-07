import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
	selectPlaylists,
	selectToken
} from "../utils/spotifyDataSlice";

export const TopItems = () => {
	const token = useSelector(selectToken);
	const [topTracks, setTopTracks] = useState([]);

	useEffect(() => {
		const getTopTracks = async () => {
			const response = await axios.get(
				`https://api.spotify.com/v1/me/top/tracks/`,
				{
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json"
					}
				}
			);
			const items = response.data.items;
			setTopTracks(items);
		};

		getTopTracks();
	}, [token]);

	return (
		<>
			{topTracks.map((track) => {
				console.log(track);
				return (
					<li
						key={track.id}
						className="flex items-center gap-3"
					>
						<img
							className="h-12 w-12 rounded-s"
							alt="track cover"
							src={track.album.images[0].url}
						></img>
						<div>
							<p>{track.name}</p>
							<p className="text-sm text-[#a4a4a4]">
								Album • {track.artists[0].name}
							</p>
						</div>
					</li>
				);
			})}
		</>
	);
};

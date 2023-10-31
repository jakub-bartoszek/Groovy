import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, setCurrentTrack } from "../utils/spotifyDataSlice";

export const TopTracks = ({ width }) => {
	const token = useSelector(selectToken);
	const [topTracks, setTopTracks] = useState([]);
	const dispatch = useDispatch()

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

	return topTracks.map((track) => (
		<li key={track.id}>
			<div
			onClick={() => dispatch(setCurrentTrack(track.uri))}
				className={`flex items-center gap-3 p-2 hover:bg-[#1a1a1a] cursor-pointer rounded-md artist ${
					width <= 70 && "justify-center"
				}`}
			>
				<img
					className="h-11 w-11 rounded-s"
					alt="track cover"
					src={track.album.images[0].url}
				></img>
				{width > 70 && (
					<div>
						<p className="text-white font-semibold text-ellipsis whitespace-nowrap overflow-hidden">{track.name}</p>
						<p className="text-sm text-[#a4a4a4]">
							Track • {track.artists[0].name}
						</p>
					</div>
				)}
			</div>
		</li>
	));
};

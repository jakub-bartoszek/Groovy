import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "../utils/spotifyDataSlice";

export const TopItems = () => {
	const token = useSelector(selectToken);
	const [topTracks, setTopTracks] = useState([]);
	const [topArtists, setTopArtists] = useState([]);

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

	useEffect(() => {
		const getTopArtists = async () => {
			const response = await axios.get(
				`https://api.spotify.com/v1/me/top/artists/`,
				{
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json"
					}
				}
			);
			const items = response.data.items;
			setTopArtists(items);
		};

		getTopArtists();
	}, [token]);

	return (
		<>
			{topArtists.map((artist) => {
				return (
					<li
						key={artist.id}
						className="flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-md"
					>
						<img
							className="h-12 w-12 rounded-full"
							alt="track cover"
							src={artist.images[0].url}
						></img>
						<div>
							<p>{artist.name}</p>
							<p className="text-sm text-[#a4a4a4]">Artist</p>
						</div>
					</li>
				);
			})}
			{topTracks.map((track) => {
				return (
					<li
						key={track.id}
						className="flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-md"
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

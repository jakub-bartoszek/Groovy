import axios from "axios";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { HeartIcon } from "../assets/heart";

export const Home = ({ token }) => {
	const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState(
		[]
	);

	useEffect(() => {
		if (token) {
			const getRecentlyPlayedTracks = async () => {
				const response = await axios.get(
					`https://api.spotify.com/v1/me/player/recently-played?limit=5`,
					{
						headers: {
							Authorization: "Bearer " + token
						}
					}
				);
				setRecentlyPlayedTracks(response.data.items);
			};
			getRecentlyPlayedTracks();
		}
	}, [token]);
	return (
		<>
			<h1>Hello!</h1>
			<div className="grid grid-cols-3 gap-4 text-white font-bold lg:grid-cols-2 md:grid-cols-1">
				<div
					key={nanoid()}
					className="flex bg-white bg-opacity-10 rounded-md items-center gap-4"
				>
					<div className="shadow-xl rounded-md h-[64px] min-w-[64px] bg-gradient-to-tr from-purple-400 to-pink-400 text-white flex items-center justify-center">
						<HeartIcon />
					</div>
					Polubione utwory
				</div>
				{recentlyPlayedTracks.map((track) => {
					console.log(track.track.album.images[2].url);
					return (
						<div
							key={nanoid()}
							className="flex bg-white bg-opacity-10 rounded-md items-center gap-4"
						>
							<img
								className=" rounded-md h-[64px] shadow-xl"
								src={track.track.album.images[2].url}
								alt="Track cover"
							></img>
							{track.track.name}
						</div>
					);
				})}
			</div>
		</>
	);
};

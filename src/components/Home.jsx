import axios from "axios";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { HeartIcon } from "../assets/heart";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../utils/spotifyDataSlice";

export const Home = ({ token }) => {
	const dispatch = useDispatch();
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
		<div className=" text-white">
			<h1 className=" text-3xl font-bold py-6">Hello!</h1>
			<div className="grid grid-cols-3 gap-4 font-bold 2xl:grid-cols-2 lg:grid-cols-1">
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
					return (
						<div
							onClick={() => dispatch(setCurrentTrack(track.track.uri))}
							key={nanoid()}
							className="cursor-pointer flex bg-white bg-opacity-10 rounded-md items-center gap-4"
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
		</div>
	);
};

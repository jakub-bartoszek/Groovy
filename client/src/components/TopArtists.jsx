import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "../utils/spotifyDataSlice";
import { NavLink } from "react-router-dom";

export const TopArtists = ({ width }) => {
	const token = useSelector(selectToken);
	const [topArtists, setTopArtists] = useState([]);

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

	return topArtists.map((artist) => (
		<li key={artist.id}>
			<NavLink to={`/artists/${artist.id}`}>
				<div className={`flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-md artist ${width <= 70 && "justify-center"}`}>
					<img
						className="h-11 w-11 rounded-full"
						alt="track cover"
						src={artist.images[0].url}
					></img>
					{width > 70 && (
						<div>
							<p className="font-semibold text-white">
								{artist.name}
							</p>
							<p className="text-sm text-[#a4a4a4]">Artist</p>
						</div>
					)}
				</div>
			</NavLink>
		</li>
	));
};

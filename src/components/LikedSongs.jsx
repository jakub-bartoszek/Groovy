import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect, useState } from "react";

export const LikedSongs = ({ token }) => {
	const [likedSongs, setLikedSongs] = useState([]);

	useEffect(() => {
		const getTopArtists = async () => {
			const response = await axios.get(
				`https://api.spotify.com/v1/me/tracks`,
				{
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json"
					}
				}
			);
			setLikedSongs(
				response.data.items.map((song, index) => {
					return {
						index: index + 1,
						trackName: song.track.name,
						albumName: song.track.album.name,
						artists: song.track.artists.map((artist) => artist.name),
						image: song.track.album.images[2].url
					};
				})
			);
		};

		getTopArtists();
	}, [token]);

	return (
		<div className="text-white">
			<div className="grid grid-cols-3">
				<div>#</div>
				<div>Title</div>
				<div>Album</div>
			</div>
			{likedSongs.map((song) => {
				return (
					<div className="grid grid-cols-[auto_1fr_1fr] ">
						<div>{song.index}</div>
						<div className="flex">
							<img
								className="h-[50px]"
								alt="Song cover"
								src={song.image}
							></img>
							<div>{song.trackName}</div>
							<div>{song.artists}</div>
						</div>
						<div>{song.albumName}</div>
					</div>
				);
			})}
		</div>
	);
};

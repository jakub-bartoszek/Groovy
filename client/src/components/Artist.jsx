import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setCurrentTrack } from "../utils/spotifyDataSlice";
import ColorThief from './node_modules/colorthief/dist/color-thief.mjs'

export const Artist = ({ token }) => {
	const { id } = useParams();
	const [artist, setArtist] = useState({});
	const [topTracks, setTopTracks] = useState([]);
	const dispatch = useDispatch();

// 	const colorThief = new ColorThief();
// const img = document.querySelector('img');

// if (img.complete) {
//   colorThief.getColor(img);
// } else {
//   image.addEventListener('load', function() {
//     colorThief.getColor(img);
//   });
// }

	useEffect(() => {
		const getArtist = async () => {
			const response = await axios.get(
				`https://api.spotify.com/v1/artists/${id}`,
				{
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json"
					}
				}
			);
			setArtist({
				name: response.data.name,
				followersCount: response.data.followers.total,
				image: response.data.images[0].url,
				genres: response.data.genres
			});
		};
		getArtist();
	}, [token, id]);

	useEffect(() => {
		const getArtistTracks = async () => {
			if (artist) {
				const response = await axios.get(
					`https://api.spotify.com/v1/artists/${id}/top-tracks?market=PL`,
					{
						headers: {
							Authorization: "Bearer " + token,
							"Content-Type": "application/json"
						}
					}
				);
				setTopTracks(
					response.data.tracks.map((track, index) => {
						return {
							index: index + 1,
							trackName: track.name,
							albumName: track.album.name,
							artists: track.artists.map((artist) => artist.name),
							image:
								track.album.images.length === 0
									? null
									: track.album.images[0].url,
							uri: track.uri
						};
					})
				);
			}
		};
		getArtistTracks();
	}, [token, id, artist]);
	return (
		<div className="flex flex-col h-[100%] overflow-y-scroll rounded-xl bg-[#121212]">
			<div className="text-white bg-[#121212]">
				<div
					className={`w-full h-[350px] bg-red-500 flex p-4`}
				>
					<div className="self-end flex gap-4">
						{artist.image ? (
							<div className="w-[232px] h-[232px] 2xl:w-[190px] 2xl:h-[190px]">
								<img
									className="h-full w-full shadow-2xl object-cover rounded-full image"
									src={artist.image}
									alt="Liked songs"
								/>
							</div>
						) : (
							<div className="w-64 h-64 shadow-2xl bg-black" />
						)}
						<div className="self-end flex flex-col gap-4">
							<p>Artist</p>
							<p className=" text-5xl font-bold">{artist.name}</p>
							<p>{`${artist.followersCount} followers`}</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col p-4 mt-12 ">
					Top tracks
					{topTracks.map((track) => (
						<div>{track.trackName}</div>
					))}
				</div>
			</div>
		</div>
	);
};

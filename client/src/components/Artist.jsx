import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	selectBgColor,
	setBgColor,
	setOpacity
} from "../utils/spotifyDataSlice";
import ColorThief from "colorthief/dist/color-thief.mjs";
import { ArtistTopTracks } from "./ArtistTopTracks";

export const Artist = ({ token }) => {
	const { id } = useParams();
	const [artist, setArtist] = useState({});
	const [topTracks, setTopTracks] = useState([]);

const bgColor = useSelector(selectBgColor)	
	const scrollRef = useRef();
	const dispatch = useDispatch();

	const colorThief = new ColorThief();
	const imageRef = useRef();

	const _ = require("lodash");

	const throttledScroll = useCallback(
		_.throttle(
			() => {
				dispatch(setOpacity(scrollRef.current.scrollTop / 300));
			},
			100,
			{ leading: false }
		),
		[setOpacity]
	);



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
							name: track.name,
							album: track.album.name,
							artists: track.artists.map((artist) => artist.name),
							image:
								track.album.images.length === 0
									? null
									: track.album.images[0].url,
							uri: track.uri,
							duration: (track.duration_ms / 60000)
							.toFixed(2)
							.toString(),
						};
					})
				);
			}
		};
		getArtistTracks();
	}, [token, id, artist]);

	return (
		<div className="h-full overflow-hidden relative rounded-md text-white">
			{artist && (
				<div
					ref={scrollRef}
					onScroll={throttledScroll}
					className="h-full overflow-y-scroll bg-[#121212]"
				>
					<div
						className="w-full h-[350px] flex"
						style={{
							backgroundColor: `rgb(${bgColor.R}, ${bgColor.G}, ${bgColor.B})`,
							boxShadow: `0 0 200px 80px #000000aa, 0 0 200px 80px rgb(${bgColor.R}, ${bgColor.G}, ${bgColor.B})`
						}}
					>
						<div className="flex self-end gap-4 w-full p-5 bg-gradient-to-t from-[#00000070]">
							<div className="min-w-[190px] w-[190px] h-[190px] lg:h-[232px] lg:min-w-[232px] rounded-full">
							{artist.image && (
									<img
										className="h-full w-full shadow-2xl image object-cover rounded-full"
										ref={imageRef}
										onLoad={() => {
											const img = imageRef.current;
											const R = colorThief.getColor(img)[0];
											const G = colorThief.getColor(img)[1];
											const B = colorThief.getColor(img)[2];

											dispatch(
												setBgColor({ R: R, G: G, B: B, A: 0 })
											);
										}}
										src={artist.image}
										alt={artist.name}
										crossOrigin="Anonymous"
									/>
								)}
							</div>
							<div className="flex flex-col justify-between drop-shadow-md">
							<p>Artist</p>
							<p className="text-7xl font-bold ">{artist.name}</p>
							<p>{artist.followersCount} followers</p>
							</div>
						</div>
					</div>
					<ArtistTopTracks token={token} tracks={topTracks}/>
				</div>
			)}
		</div>
	);
};

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	selectCurrentTrack,
	setCurrentTrack
} from "../utils/spotifyDataSlice";
import ColorThief from "colorthief/dist/color-thief.mjs";

export const Artist = ({ token }) => {
	const { id } = useParams();
	const [artist, setArtist] = useState({});
	const [topTracks, setTopTracks] = useState([]);
	const [bgColor, setBgColor] = useState("");
	const [showMore, setShowMore] = useState(false);

	const dispatch = useDispatch();
	const currentTrack = useSelector(selectCurrentTrack);
	const colorThief = new ColorThief();
	const imageRef = useRef();

	useEffect(() => {
		setShowMore(false);
	}, [id]);

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
		<div className="h-full w-full overflow-y-scroll text-white bg-[#121212]">
			<div
				className="w-full h-[350px] flex"
				style={{
					backgroundColor: bgColor,
					boxShadow: `0 0 400px 80px ${bgColor}`
				}}
			>
				<div className="flex self-end gap-4 w-full p-4 bg-gradient-to-t from-[#00000070] h-full">
					{artist.image ? (
						<div className="w-[232px] h-[232px] 2xl:w-[190px] 2xl:h-[190px] self-end">
							<img
								ref={imageRef}
								onLoad={() => {
									const img = imageRef.current;
									const R = colorThief.getColor(img)[0];
									const G = colorThief.getColor(img)[1];
									const B = colorThief.getColor(img)[2];
									setBgColor(`rgba(${R} ,${G}, ${B}, 0.5)`);
								}}
								className="h-full w-full shadow-2xl object-cover rounded-full image"
								src={artist.image}
								alt="Liked songs"
								crossOrigin="Anonymous"
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
			<div className="flex flex-col p-4">
				<p className="font-bold text-2xl py-6">Top tracks</p>
				<div className="flex flex-col">
					{topTracks.slice(0, showMore ? 10 : 5).map((track) => (
						<div
							key={track.index}
							className="flex items-center gap-4 cursor-pointer hover:bg-[#ffffff10] py-2 px-4 rounded-md"
							onClick={() => {
								dispatch(setCurrentTrack(track.uri));
							}}
						>
							<div>{track.index}</div>

							<img
								alt={track.name}
								src={track.image}
								className="w-12"
							></img>
							<div>
								<p
									className={`${
										track.uri === currentTrack[0]
											? "text-green-500"
											: "text-white"
									} font-bold`}
								>
									{track.trackName}
								</p>
								<p className="text-muted">
									{track.artists.join(", ")}
								</p>
							</div>
						</div>
					))}
					<button
						className="w-fit font-bold"
						onClick={() => {
							setShowMore((showMore) => !showMore);
						}}
					>
						Show {showMore ? "more" : "less"}
					</button>
				</div>
			</div>
		</div>
	);
};

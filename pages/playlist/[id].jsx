import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useSpotify from "../../hooks/useSpotify";
import { useSession } from "next-auth/react";
import ColorThief from "colorthief/dist/color-thief.mjs";
import { AccountBar } from "../../components/AccountBar";
import { TrackList } from "../../components/TrackList";

export default function Playlist() {
	const { data: session } = useSession();
	const [playlist, setPlaylist] = useState();
	const [tracks, setTracks] = useState();
	const [ownerImage, setOwnerImage] = useState("");
	const [bgColor, setBgColor] = useState({
		R: 18,
		G: 18,
		B: 18,
		A: 0
	});
	const [playlistColor, setPlaylistColor] = useState("#121212");
	const imageRef = useRef();
	const spotifyApi = useSpotify();
	const router = useRouter();
	const colorThief = new ColorThief();
	const scrollRef = useRef();
	const [opacity, setOpacity] = useState(0);

	const _ = require('lodash');

	const throttledScroll = useCallback(_.throttle(() => {
    setOpacity(scrollRef.current.scrollTop/300);
  }, 100, { leading: false }), [setOpacity]);

	useEffect(() => {
		if (spotifyApi.getAccessToken() && router.query.id) {
			spotifyApi.getPlaylist(router.query.id).then((data) => {
				setPlaylist({
					id: data.body.id,
					name: data.body.name,
					owner: data.body.owner.display_name,
					ownerId: data.body.owner.id,
					image: data.body.images[0]?.url,
					tracksTotal: data.body.tracks.total
				});
				setTracks(
					data.body.tracks.items.map((track, index) => {
						return {
							index: index + 1,
							id: track.track.id,
							name: track.track.name,
							artists: track.track.artists.map(
								(artist) => artist.name
							),
							album: track.track.album.name,
							image:
								track.track.album.images[
									track.track.album.images.length - 1
								]?.url,
							duration: (track.track.duration_ms / 60000)
								.toFixed(2)
								.toString(),
							dateAdded: track.added_at
						};
					})
				);
			});
		}
		if (playlist) {
			spotifyApi
				.getUser(playlist.ownerId)
				.then((data) => setOwnerImage(data.body.images[0].url));
		}
	}, [session, spotifyApi, router.query.id]);
	return (
		<div className="h-full overflow-hidden relative rounded-md">
			<AccountBar bgColor={bgColor} opacity={opacity} />
			{playlist && (
				<div
					ref={scrollRef}
					onScroll={throttledScroll}
					className="h-full overflow-y-scroll scroll-smooth scrollbar scrollbar-w-3 scrollbar-track-rounded-md scrollbar-thumb-[#ffffff50] hover:scrollbar-thumb-[#ffffff99]"
				>
					<div
						className="w-full h-[350px] flex"
						style={{
							backgroundColor: playlistColor,
							boxShadow: `0 0 200px 80px #000000aa, 0 0 200px 80px ${playlistColor}`
						}}
					>
						<div className="flex self-end gap-4 w-full p-5 bg-gradient-to-t from-[#00000070]">
							<div className=" bg-black w-[190px] h-[190px] lg:h-[232px] lg:w-[232px]">
								{playlist.image && (
									<img
										className="h-full w-full shadow-2xl object-cover image"
										ref={imageRef}
										onLoad={() => {
											const img = imageRef.current;
											const R = colorThief.getColor(img)[0];
											const G = colorThief.getColor(img)[1];
											const B = colorThief.getColor(img)[2];

											setBgColor({ R: R, G: G, B: B, A: 0 });
											setPlaylistColor(`rgb(${R}, ${G}, ${B})`);
										}}
										src={playlist.image}
										alt="Liked songs"
										crossOrigin="Anonymous"
									/>
								)}
							</div>
							<div className="flex flex-col justify-between">
								<div>Playlist</div>
								<div className="flex flex-col gap-4">
									<p className="text-7xl font-bold">
										{playlist.name}
									</p>
									<div className="flex items-center gap-2">
										<img
											className="rounded-full h-6"
											src={ownerImage}
										/>
										<p className="text-sm">
											<b>{playlist.owner}</b>
											{` • ${playlist.tracksTotal} tracks`}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<TrackList opacity={opacity} tracks={tracks} />
				</div>
			)}
		</div>
	);
}

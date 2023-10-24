import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import useSpotify from "../../hooks/useSpotify";
import { useSession } from "next-auth/react";
import ColorThief from "colorthief/dist/color-thief.mjs";
import { AccountBar } from "../../components/AccountBar";

export default function Playlist() {
	const [playlist, setPlaylist] = useState();
	const [ownerImage, setOwnerImage] = useState("");
	const imageRef = useRef();
	const [bgColor, setBgColor] = useState("#121212");
	const colorThief = new ColorThief();
	const spotifyApi = useSpotify();
	const { data: session } = useSession();
	const router = useRouter();

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
			<AccountBar />
			{playlist && (
				<div className="h-full overflow-y-scroll scrollbar scrollbar-w-3 scrollbar-track-rounded-md scrollbar-thumb-[#ffffff50] hover:scrollbar-thumb-[#ffffff99]">
					<div
						className="w-full h-[350px] flex"
						style={{
							backgroundColor: bgColor,
							boxShadow: `0 0 400px 80px ${bgColor}`
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
											setBgColor(`rgb(${R} ,${G}, ${B})`);
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
									<p className="flex gap-2">
										<img
											className="rounded-full h-6"
											src={ownerImage}
										/>
										{`${playlist.owner} • ${playlist.tracksTotal} tracks`}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

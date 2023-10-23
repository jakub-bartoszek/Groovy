
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import useSpotify from "../../hooks/useSpotify";
import { useSession } from "next-auth/react";
import ColorThief from "colorthief/dist/color-thief.mjs";


export default function Playlist() {
	const imageRef = useRef();
	const [bgColor, setBgColor] = useState("#121212");
	const colorThief = new ColorThief();

	const spotifyApi = useSpotify();
	const { data: session } = useSession();
	const router = useRouter()
	
	useEffect(() => {
		if (spotifyApi.getAccessToken() & router.query.id) {
			spotifyApi.getPlaylist(router.query.id).then((data) => {
				console.log(data.body);
			});
		}
	}, [session, spotifyApi]);

	
	console.log(router.query.id)
	return <div>playlista</div>;
}

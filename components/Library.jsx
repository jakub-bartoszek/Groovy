import React, { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { LibraryIcon } from "@heroicons/react/outline";

export const Library = () => {
	const spotifyApi = useSpotify();
	const [playlists, setPlaylists] = useState([]);
	const { data: session, status } = useSession();

	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi.getUserPlaylists().then((data) => {
				setPlaylists(data.body.items);
			});
		}
	}, [session, spotifyApi]);

	return (
		<div
			className="rounded-md p-5 gap-4 font-extrabold text-[#b3b3b3] bg-[#121212]
		overflow-y-scroll scrollbar-none hover:scrollbar scrollbar-w-3 scrollbar-track-transparent scrollbar-thumb-[#5a5a5a] hover:scrollbar-thumb-[#898989]"
		>
			<h2 className="flex items-center gap-6">
				<LibraryIcon className="w-6" />
				Library
			</h2>
		</div>
	);
};

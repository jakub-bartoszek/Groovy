import React, { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { LibraryIcon, MusicNoteIcon } from "@heroicons/react/outline";

export const Library = ({ width }) => {
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
		<div className="rounded-md gap-4 text-[#b3b3b3] bg-[#121212] h-full overflow-hidden">
			<h2 className="flex items-center gap-6 font-extrabold p-5">
				<LibraryIcon className="w-6" />
				{width > 70 && <p>Library</p>}
			</h2>
			<ul
				className={`p-1 h-full overflow-y-scroll scrollbar-none pb-16 ${
					width > 70 && "hover:scrollbar"
				} scrollbar-w-3 scrollbar-track-transparent scrollbar-thumb-[#5a5a5a] hover:scrollbar-thumb-[#898989]`}
			>
				{playlists.map((playlist) => (
					<li
						key={playlist.id}
						className={`flex items-center gap-3 ${
							width <= 70 && "justify-center"
						} p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer`}
					>
						{playlist.images[0] ? (
							<img
								className="h-11 w-11 rounded-[4px]"
								src={playlist.images[playlist.images.length - 1]?.url}
							/>
						) : (
							<div className="h-11 w-11 rounded-[4px] bg-[#282828] flex items-center justify-center">
								<MusicNoteIcon className="w-6" />
							</div>
						)}

						{width > 70 && (
							<div>
								<p className="font-extrabold text-white">
									{playlist.name}
								</p>
								<p className=" text-sm">
									Playlist • {playlist.owner.display_name}
								</p>
							</div>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

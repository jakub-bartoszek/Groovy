import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { MusicNoteIcon } from "@heroicons/react/outline";
import Link from "next/link";

export const Playlists = ({ width }) => {
	const [playlists, setPlaylists] = useState([]);
	const spotifyApi = useSpotify();
	const { data: session } = useSession();
	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi.getUserPlaylists().then((data) => {
				setPlaylists(data.body.items);
			});
		}
	}, [session, spotifyApi]);

	return (
		<>
			{playlists.map((playlist) => (
				<li key={playlist.id}>
					<Link href={`/playlist/${playlist.id}`}>
						<div
							className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer ${
								width <= 70 && "justify-center"
							}`}
						>
							{playlist.images[0] ? (
								<img
									className="h-11 w-11 rounded-[4px]"
									src={
										playlist.images[playlist.images.length - 1]?.url
									}
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
						</div>
					</Link>
				</li>
			))}
		</>
	);
};

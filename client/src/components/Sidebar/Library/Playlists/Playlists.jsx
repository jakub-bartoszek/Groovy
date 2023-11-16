import { PlaylistItem } from "./PlaylistItem";
import { nanoid } from "@reduxjs/toolkit";
import { selectPlaylists } from "../../../../utils/redux/librarySlice";
import { useSelector } from "react-redux";

export const Playlists = ({ accessToken, width }) => {
	const playlists = useSelector(selectPlaylists);

	return (
		<>
			<PlaylistItem
				key={nanoid()}
				path={`/liked`}
				name="Liked songs"
				likedSongs={true}
				width={width}
			/>
			{playlists.map((playlist) => (
				<PlaylistItem
					key={nanoid()}
					path={`/playlists/${playlist.id}`}
					item={playlist}
					width={width}
				/>
			))}
		</>
	);
};

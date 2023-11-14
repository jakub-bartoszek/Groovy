import { useEffect } from "react";
import { PlaylistItem } from "./PlaylistItem";
import { nanoid } from "@reduxjs/toolkit";
import {
	fetchPlaylists,
	selectPlaylists
} from "../../../../utils/redux/librarySlice";
import { useDispatch, useSelector } from "react-redux";

export const Playlists = ({ accessToken, width }) => {
	const playlists = useSelector(selectPlaylists);
	const dispatch = useDispatch();

	useEffect(() => {
		if (accessToken) {
			dispatch(fetchPlaylists(accessToken));
		}
	}, [dispatch, accessToken]);

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

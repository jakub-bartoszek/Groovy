import MusicNoteIcon from "@heroicons/react/outline/MusicNoteIcon";
import { nanoid } from "@reduxjs/toolkit";
import { NavLink } from "react-router-dom";

export const PlaylistItem = ({ item, width, path, likedSongs }) => (
	<li key={nanoid()}>
		<NavLink to={path}>
			<div
				className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer playlist ${
					width <= 70 && "justify-center"
				}`}
			>
				<div className="h-11 w-11 rounded-md bg-[#282828] flex items-center justify-center relative">
					<MusicNoteIcon className="w-6 text-muted" />
					{likedSongs ? (
						<img
							className="h-11 w-11 rounded-md absolute"
							alt={likedSongs ? "Liked songs" : item.name}
							src={"https://misc.scdn.co/liked-songs/liked-songs-64.png"}
						/>
					) : (
						item.images[0] && (
							<img
								alt={likedSongs ? "Liked songs" : item.name}
								className="h-11 w-11 rounded-md absolute"
								src={item?.images[item.images.length - 1]?.url}
							/>
						)
					)}
				</div>
				{width > 70 && (
					<div className="flex flex-col">
						<span className="font-semibold text-white">
							{likedSongs ? "Liked songs" : item.name}
						</span>
						<span className=" text-sm">
							{!likedSongs && `Playlist • ${item.owner.display_name}`}
						</span>
					</div>
				)}
			</div>
		</NavLink>
	</li>
);

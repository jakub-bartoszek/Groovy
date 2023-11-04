import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../../../../utils/playerSlice";

export const TopTrackItem = ({ item, width }) => {
	const dispatch = useDispatch();
	return (
		<li
			className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer ${
				width <= 70 && "justify-center"
			}`}
			onClick={() => dispatch(setCurrentTrack(item.uri))}
			key={nanoid()}
		>
			<div className="h-11 w-11 rounded-md bg-[#282828] flex items-center justify-center relative">
				{item.album.images[0] && (
					<img
						className="h-11 w-11 rounded-md absolute"
						alt={item.name}
						src={item.album.images[0].url}
					/>
				)}
			</div>
			{width > 70 && (
				<div className="flex flex-col">
					<span className="font-semibold text-white">{item.name}</span>
					<span className=" text-sm">Track • {item.artists[0].name}</span>
				</div>
			)}
		</li>
	);
};

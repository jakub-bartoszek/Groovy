import { useDispatch, useSelector } from "react-redux";
import {
	selectCurrentTrack,
	setCurrentTrack
} from "../utils/spotifyDataSlice";
import { nanoid } from "@reduxjs/toolkit";

export const TrackList = ({ tracks }) => {
	const dispatch = useDispatch();
	const currentTrack = useSelector(selectCurrentTrack);

	return (
		<div className="w-full">
			<div className="flex border-b border-[#ffffff33] mb-2 gap-2 text-muted">
				<div className="flex items-center justify-center w-[5%]">#</div>
				<div className="w-[50%]">Title</div>
				<div className="w-[45%]">Album</div>
			</div>
			{tracks.map((track) => {
				return (
					<div
						onClick={() => dispatch(setCurrentTrack(track.uri))}
						key={nanoid()}
						className="cursor-pointer flex py-2 gap-x-2 rounded-md
						hover:bg-[#ffffff10]"
					>
						<div className="flex items-center justify-center w-[5%]">
							{track.index}
						</div>
						<div className="flex gap-4 items-center w-[50%]">
							{track.image ? (
								<img
									className="h-[50px]"
									alt="Song cover"
									src={track.image}
								/>
							) : (
								<div className="h-[50px] w-[50px] bg-black"></div>
							)}
							<div className="overflow-hidden">
								<p
									className={`font-bold text-ellipsis whitespace-nowrap overflow-hidden pr-6 ${
										track.uri === currentTrack[0]
											? "text-green-500"
											: "text-white"
									}`}
								>
									{track.trackName}
								</p>
								<p className="text-muted text-ellipsis whitespace-nowrap overflow-hidden">
									{track.artists.join(", ")}
								</p>
							</div>
						</div>
						<div className="overflow-hidden w-[45%]">
							<p className=" text-ellipsis whitespace-nowrap overflow-hidden">
								{track.albumName}
							</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};

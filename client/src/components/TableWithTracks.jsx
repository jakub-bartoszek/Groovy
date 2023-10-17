import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../utils/spotifyDataSlice";
import { nanoid } from "@reduxjs/toolkit";

export const TrackList = ({ tracks }) => {
  const dispatch = useDispatch()
	return (
		<>
			{tracks.map((track) => {
				return (
					<div
						onClick={() => dispatch(setCurrentTrack(track.uri))}
						key={nanoid()}
						className="grid grid-cols-[5%_60%_35%] cursor-pointer hover:bg-[#ffffff10] py-2 rounded-md"
					>
						<div className="flex items-center justify-center">
							{track.index}
						</div>
						<div className="flex gap-4 items-center">
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
								<p className="font-bold text-ellipsis whitespace-nowrap overflow-hidden">
									{track.trackName}
								</p>
								<p className="text-muted text-ellipsis whitespace-nowrap overflow-hidden">
									{track.artists.join(", ")}
								</p>
							</div>
						</div>
						<div className="text-ellipsis whitespace-nowrap overflow-hidden flex items-center">
							{track.albumName}
						</div>
					</div>
				);
			})}
		</>
	);
};

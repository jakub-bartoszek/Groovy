import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../../utils/redux/playerSlice";
import { setOpacity } from "../../utils/redux/colorsSlice";
import ClockIcon from "@heroicons/react/outline/ClockIcon";
import { PlayIcon } from "../../assets/icons/PlayIcon";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect } from "react";

export const PlaylistTracks = ({ tracks, opacity, width }) => {
	const dispatch = useDispatch();

	const dateFormat = {
		year: "numeric",
		month: "short",
		day: "numeric"
	};

	useEffect(() => {
		dispatch(setOpacity(0));
	}, [dispatch]);

	return (
		<div className="w-full text-sm">
			<div
				className="px-2 mt-5 sticky top-[72px]"
				style={{
					backgroundColor: `rgba(18, 18, 18, ${opacity >= 1 ? "1" : "0"})`
				}}
			>
				<div
					className={`grid gap-4 px-4 py-2 border-b-2 border-[#ffffff11] mb-5 text-muted
					${width >= 750 && "grid-cols-[1rem_6fr_4fr_3fr_minmax(16px,_1fr)]"}
					${width < 750 && width >= 550 && "grid-cols-[1rem_4fr_2fr_minmax(120px,_1fr)]"}
					${width < 550 && "grid-cols-[1rem_3fr_minmax(60px,_1fr)]"}`}
				>
					<span>#</span>
					<span>Title</span>
					{width >= 550 && <span>Album</span>}
					{width >= 750 && <span>Date Added</span>}
					<div className="flex justify-center">
						<ClockIcon className="w-5" />
					</div>
				</div>
			</div>
			<div className="px-2">
				{tracks?.map((track) => {
					const date = new Date(track.dateAdded);
					return (
						<div
							className={`grid rounded-md group gap-4 px-4 hover:bg-[#ffffff22] text-muted
							${width >= 750 && "grid-cols-[1rem_6fr_4fr_3fr_minmax(16px,_1fr)]"}
							${width < 750 && width >= 550 && "grid-cols-[1rem_4fr_2fr_minmax(120px,_1fr)]"}
							${width < 550 && "grid-cols-[1rem_3fr_minmax(60px,_1fr)]"}`}
							key={nanoid()}
						>
							<span className="flex items-center justify-center group-hover:hidden">
								{track.index}
							</span>
							<button
								className="hidden items-center justify-center group-hover:flex cursor-pointer"
								onClick={() => {
									dispatch(setCurrentTrack(track.uri));
								}}
							>
								<PlayIcon size={10} />
							</button>
							<div className="flex items-center gap-4 py-2 overflow-hidden">
								<div className="h-[40px] w-[40px] min-h-[40px] min-w-[40px] bg-black">
									{track.image && (
										<img
											className="object-cover"
											alt="Song cover"
											src={track.image}
										/>
									)}
								</div>
								<div className="overflow-hidden flex flex-col">
									<span className="text-ellipsis whitespace-nowrap overflow-hidden">
										{track.name}
									</span>
									<span className="text-ellipsis whitespace-nowrap overflow-hidden">
										{track.artists.join(", ")}
									</span>
								</div>
							</div>
							{width >= 550 && (
								<div className="overflow-hidden flex items-center">
									<span className="text-ellipsis whitespace-nowrap overflow-hidden">
										{track.album}
									</span>
								</div>
							)}
							{width >= 750 && (
								<div className="overflow-hidden flex items-center">
									<span>{date.toLocaleDateString(undefined, dateFormat)}</span>
								</div>
							)}
							<div className="flex items-center justify-center">
								<span>{track.duration.replace(".", ":")}</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../../utils/spotifyDataSlice";
import ClockIcon from "@heroicons/react/outline/ClockIcon";
import CalendarIcon from "@heroicons/react/outline/CalendarIcon";
import { PlayIcon } from "../../assets/icons/play";

export const PlaylistTracks = ({ tracks, opacity, width }) => {
	const dateFormat = {
		year: "numeric",
		month: "short",
		day: "numeric"
	};

	const dispatch = useDispatch();

	return (
		<div className="w-full text-sm">
			<div
				style={{
					backgroundColor: `rgba(18, 18, 18, ${
						opacity >= 1 ? "1" : "0"
					})`
				}}
				className="px-5 mt-5 sticky top-[72px]"
			>
				<div
					className={`grid grid-cols-[5%_35%_30%_20%_10%] border-b-2 border-[#ffffff11] mb-5 ${
						width <= 600 && "grid-cols-[5%_45%_35%_15%]"
					}`}
				>
					<p className="flex p-2 justify-center">#</p>
					<p className="flex p-2">Title</p>
					<p className="flex p-2">Album</p>
					{width >= 600 && (
						<p className="flex p-2 justify-center">
							<CalendarIcon className="w-5" />
						</p>
					)}
					<p className="flex p-2 justify-center">
						<ClockIcon className="w-5" />
					</p>
				</div>
			</div>
			<div className="px-5">
				{tracks?.map((track) => {
					const date = new Date(track.dateAdded);
					return (
						<div
							onClick={() => {
								dispatch(setCurrentTrack(track.uri));
							}}
							key={track.id}
							className={`grid grid-cols-[5%_35%_30%_20%_10%] cursor-pointer rounded-[10px] hover:bg-[#ffffff22] group ${
								width <= 600 && "grid-cols-[5%_45%_35%_15%]"
							}`}
						>
							<div className="flex p-2 items-center justify-center group-hover:hidden">
								{track.index}
							</div>
							<div className="hidden p-2 items-center justify-center group-hover:flex">
								<PlayIcon size={14} />
							</div>
							<div className="flex items-center gap-4 p-2 pl-0">
								<div className="h-[40px] w-[40px] min-h-[40px] min-w-[40px] bg-black">
									{track.image && (
										<img
											className="object-cover"
											alt="Song cover"
											src={track.image}
										/>
									)}
								</div>
								<div className="overflow-hidden flex flex-col justify-center">
									<p
										className={`font-semibold text-ellipsis whitespace-nowrap overflow-hidden`}
									>
										{track.name}
									</p>
									<p className="text-muted text-ellipsis whitespace-nowrap overflow-hidden">
										{track.artists.join(", ")}
									</p>
								</div>
							</div>
							<div className="flex p-2">
								<div className="overflow-hidden flex flex-col justify-center">
									<p
										className={`text-ellipsis whitespace-nowrap overflow-hidden`}
									>
										{track.album}
									</p>
								</div>
							</div>
							{width >= 600 && (
								<div className="flex p-2 items-center justify-center">
									{date.toLocaleDateString(undefined, dateFormat)}
								</div>
							)}
							<div className="flex p-2 items-center justify-center">
								<p className=" text-ellipsis whitespace-nowrap overflow-hidden">
									{track.duration.replace(".", ":")}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

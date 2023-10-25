import ClockIcon from "@heroicons/react/outline/ClockIcon";
import CalendarIcon from "@heroicons/react/outline/CalendarIcon";
import useSpotify from "../hooks/useSpotify";

export const TrackList = ({ tracks, opacity }) => {
	const spotifyApi = useSpotify();

	const dateFormat = {
		year: "numeric",
		month: "short",
		day: "numeric"
	};

	const playSong = () => {
	};

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
				<div className="grid grid-cols-[5%_35%_30%_20%_10%] border-b-2 border-[#ffffff11] mb-5">
					<p className="flex p-2 justify-center">#</p>
					<p className="flex p-2">Title</p>
					<p className="flex p-2">Album</p>
					<p className="flex p-2 justify-center">
						<CalendarIcon className="w-5" />
					</p>
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
							onClick={() => playSong(track.uri)}
							key={track.id}
							className=" grid grid-cols-[5%_35%_30%_20%_10%] cursor-pointer"
						>
							<div className="flex p-2 items-center justify-center">
								{track.index}
							</div>
							<div className="flex items-center gap-4 p-2">
								<div className="h-[40px] w-[40px] min-h-[40px] min-w-[40px] bg-black objec">
									{track.image && (
										<img
											className=""
											alt="Song cover"
											src={track.image}
										/>
									)}
								</div>
								<div className="overflow-hidden flex flex-col justify-center">
									<p
										className={`font-bold text-ellipsis whitespace-nowrap overflow-hidden`}
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
							<div className="flex p-2 items-center justify-center">
								{date.toLocaleDateString(undefined, dateFormat)}
							</div>
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

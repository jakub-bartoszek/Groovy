import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../utils/spotifyDataSlice";
import { PlayIcon } from "../assets/icons/play";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ArtistTopTracks = ({ tracks }) => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const [showMore, setShowMore] = useState(false);
  
	useEffect(() => {
		setShowMore(false);
	}, [id]);

	return (
		<div className="w-full px-10">
			<h2 className="text-2xl font-semibold py-5">Popular</h2>
			{tracks.slice(0, showMore ? 10 : 5)?.map((track) => {
				return (
					<div
						onClick={() => {
							dispatch(setCurrentTrack(track.uri));
						}}
						key={track.id}
						className="grid grid-cols-[5%_50%_35%_10%] cursor-pointer rounded-md hover:bg-[#ffffff22] group"
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
						<div className="flex p-2 items-center justify-center">
							<p className=" text-ellipsis whitespace-nowrap overflow-hidden">
								{track.duration.replace(".", ":")}
							</p>
						</div>
					</div>
				);
			})}
      <button onClick={() => setShowMore(!showMore)}>Show {showMore ? "less" : "more"}</button>
		</div>
	);
};

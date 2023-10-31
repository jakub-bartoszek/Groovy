import { useDispatch } from "react-redux";
import { addToQueue, setCurrentTrack } from "../utils/spotifyDataSlice";
import { PlayIcon } from "../assets/icons/play";

export const PlayButton = ({playlist}) => {
const dispatch = useDispatch()

	return (
		<div
			onClick={() => {
				dispatch(setCurrentTrack(playlist.queue[0]));
				dispatch(addToQueue(playlist.queue.slice(1)));
			}}
			className="w-14 h-14 flex items-center justify-center cursor-pointer m-5 bg-green-500 rounded-full text-black p-2"
		>
			<PlayIcon size={20} />
		</div>
	);
};

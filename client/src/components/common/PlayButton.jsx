import { useDispatch } from "react-redux";
import { addToQueue, setCurrentTrack } from "../../utils/playerSlice";
import { PlayIcon } from "../../assets/icons/PlayIcon";

export const PlayButton = ({ playlist }) => {
	const dispatch = useDispatch();

	return (
		<div
			className="w-14 h-14 flex items-center justify-center cursor-pointer m-5 bg-green-500 rounded-full text-black p-2"
			onClick={() => {
				dispatch(setCurrentTrack(playlist.queue[0]));
				dispatch(addToQueue(playlist.queue.slice(1)));
			}}
		>
			<PlayIcon size={20} />
		</div>
	);
};

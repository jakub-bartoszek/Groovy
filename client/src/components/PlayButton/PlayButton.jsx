import { useDispatch } from "react-redux";
import { addToQueue, setCurrentTrack } from "../../utils/redux/playerSlice";
import { PlayIcon } from "../../assets/icons/PlayIcon";

const PlayButton = ({ queue }) => {
 const dispatch = useDispatch();

 const playButtonClickHandler = () => {
  dispatch(setCurrentTrack(queue[0]));
  dispatch(addToQueue(queue.slice(1)));
 };

 return (
  <div
   className="w-14 h-14 flex items-center justify-center cursor-pointer m-5 bg-green-500 rounded-full p-2 text-black"
   onClick={playButtonClickHandler}
  >
   <PlayIcon size={20} />
  </div>
 );
};

export default PlayButton;

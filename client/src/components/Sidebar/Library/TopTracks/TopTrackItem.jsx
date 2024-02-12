import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../../../../utils/redux/playerSlice";

const TopTrackItem = ({ item }) => {
 const dispatch = useDispatch();

 const handleItemClick = () => {
  dispatch(setCurrentTrack(item.uri));
 };

 return (
  <li
   className="flex items-center gap-2 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer"
   onClick={handleItemClick}
   key={item.id || nanoid()}
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
   <div className="flex-col hidden @[71px]:flex">
    <span className="font-semibold text-white">{item.name}</span>
    <span className="text-sm">Track • {item.artists[0].name}</span>
   </div>
  </li>
 );
};

export default TopTrackItem;

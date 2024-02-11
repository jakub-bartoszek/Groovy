import { useRef } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../../utils/redux/playerSlice";

const Tile = ({ track, name, imgSrc }) => {
 const imageRef = useRef();

 const dispatch = useDispatch();

 const handleTileClick = () => {
  if (track) {
   dispatch(setCurrentTrack(track.track.uri));
  }
 };

 return (
  <li
   id={nanoid()}
   className="cursor-pointer flex gap-4 items-center bg-white bg-opacity-10 rounded-[10px] relative hover:bg-opacity-20 transition-all"
   onClick={() => handleTileClick()}
  >
   <img
    className="rounded-[10px] h-16 w-16 @5xl:h-20 @5xl:w-20 shadow-xl"
    ref={imageRef}
    src={track ? track.track.album.images[2].url : imgSrc}
    alt="Track cover"
    crossOrigin="Anonymous"
   />
   <span>{track ? track.track.name : name}</span>
  </li>
 );
};

export default Tile;

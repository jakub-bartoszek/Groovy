import ColorThief from "colorthief/dist/color-thief.mjs";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../../utils/redux/playerSlice";
import { setBgColor } from "../../utils/redux/colorsSlice";

const Tile = ({ track, name, imgSrc, width }) => {
 const dispatch = useDispatch();
 const imageRef = useRef();
 const colorThief = new ColorThief();

 const handleTileClick = () => {
  if (track) {
   dispatch(setCurrentTrack(track.track.uri));
  }
 };

 const handleMouseEnter = () => {
  if (imageRef.current) {
   const img = imageRef.current;
   const [R, G, B] = colorThief.getColor(img);
   dispatch(setBgColor({ R, G, B, A: 1 }));
  }
 };

 return (
  <li
   className="cursor-pointer bg-white bg-opacity-10 rounded-[10px] relative"
   onClick={handleTileClick}
  >
   <div
    className="aboslute flex items-center"
    onMouseEnter={handleMouseEnter}
   >
    <img
     className="rounded-[10px] h-[64px] w-[64px] shadow-xl"
     ref={imageRef}
     src={track ? track.track.album.images[2].url : imgSrc}
     alt="Track cover"
     crossOrigin="Anonymous"
    />
    <span className={`px-4 ${width < 800 && "text-sm"}`}>{track ? track.track.name : name}</span>
   </div>
  </li>
 );
};

export default Tile;

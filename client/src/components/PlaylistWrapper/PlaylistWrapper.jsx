import { useCallback, useEffect, useRef } from "react";
import {
 selectBgColor,
 selectOpacity,
 setBgColor,
 setOpacity
} from "../../utils/redux/colorsSlice";
import { useDispatch, useSelector } from "react-redux";
import PlayButton from "../PlayButton/PlayButton";
import PlaylistTracks from "../PlaylistTracks/PlaylistTracks";
import MusicNoteIcon from "@heroicons/react/outline/MusicNoteIcon";
import ColorThief from "colorthief/dist/color-thief.mjs";
import _ from "lodash";

const colorThief = new ColorThief();

const PlaylistWrapper = ({ width, tracks, image, header, name, queue }) => {
 const dispatch = useDispatch();
 const scrollRef = useRef();
 const imageRef = useRef();
 const { R, G, B } = useSelector(selectBgColor);
 const opacity = useSelector(selectOpacity);

 const throttledScroll = useCallback(
  _.throttle(
   () => {
    dispatch(setOpacity(scrollRef.current.scrollTop / 400));
   },
   100,
   { leading: false }
  ),
  [setOpacity]
 );

 useEffect(() => {
  dispatch(setBgColor({ R: 18, G: 18, B: 18, A: 0 }));
 }, []);

 const renderTracks = () => {
  if (tracks.length > 0) {
   return (
    <>
     <PlayButton queue={queue} />
     <PlaylistTracks
      width={width}
      opacity={opacity}
      tracks={tracks}
     />
    </>
   );
  } else {
   return <div className="flex justify-center p-10 text-muted">No tracks yet...</div>;
  }
 };

 return (
  <div className="h-full overflow-hidden relative rounded-[10px] text-white">
   <div
    className="h-full overflow-y-scroll bg-[#121212]"
    ref={scrollRef}
    onScroll={throttledScroll}
   >
    <div
     className={`w-full flex ${width > 550 ? "h-[350px]" : "h-[200px]"}`}
     style={{
      backgroundColor: `rgb(${R}, ${G}, ${B})`,
      boxShadow: `0 0 200px 80px #000000aa, 0 0 200px 80px rgb(${R}, ${G}, ${B})`,
      transition: "all 500ms"
     }}
    >
     <div className="flex self-end gap-4 w-full p-5 bg-gradient-to-t from-[#00000070]">
      <div
       className={`bg-[#282828] relative flex items-center justify-center aspect-square ${
        width > 550 ? "h-48 w-48" : "h-24 w-24"
       }`}
      >
       <MusicNoteIcon className="w-20 text-muted" />
       {image && (
        <img
         className="h-full w-full shadow-2xl object-cover absolute top-0"
         ref={imageRef}
         onLoad={() => {
          const img = imageRef.current;
          const [R, G, B] = colorThief.getColor(img);
          dispatch(setBgColor({ R, G, B, A: 0 }));
         }}
         src={image}
         alt={name}
         crossOrigin="Anonymous"
        />
       )}
      </div>
      {header}
     </div>
    </div>
    {renderTracks()}
   </div>
  </div>
 );
};

export default PlaylistWrapper;

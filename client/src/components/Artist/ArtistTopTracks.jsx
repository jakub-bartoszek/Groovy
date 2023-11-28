import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../../utils/redux/playerSlice";
import { PlayIcon } from "../../assets/icons/PlayIcon";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

export const ArtistTopTracks = ({ tracks, width }) => {
 const { id } = useParams();
 const dispatch = useDispatch();
 const [showMore, setShowMore] = useState(false);

 useEffect(() => {
  setShowMore(false);
 }, [id]);

 return (
  <div className="w-full px-2">
   <h2 className="text-2xl font-semibold py-5">Popular</h2>
   {tracks.slice(0, showMore ? 10 : 5)?.map((track) => {
    return (
     <div
      className={`gap-4 px-4 py-2 group rounded-[10px] hover:bg-[#ffffff22] ${
       width > 500
        ? "grid grid-cols-[1rem_2fr_1fr_minmax(60px,_1fr)]"
        : width > 350 ? "grid grid-cols-[1rem_2fr_minmax(60px,_1fr)]" : "grid grid-cols-[1rem_1fr]"
      }`}
      key={nanoid()}
     >
      <span className="flex items-center justify-center group-hover:hidden">
       {track.index}
      </span>
      <button
       onClick={() => {
        dispatch(setCurrentTrack(track.uri));
       }}
       className="hidden items-center justify-center group-hover:flex cursor-pointer"
      >
       <PlayIcon size={10} />
      </button>
      <div className="flex items-center gap-4 text-ellipsis whitespace-nowrap overflow-hidden">
       <div className="h-[40px] w-[40px] min-h-[40px] min-w-[40px] bg-black">
        {track.image && (
         <img
          className="object-cover"
          alt="Song cover"
          src={track.image}
         />
        )}
       </div>
       <div className="flex flex-col justify-center overflow-hidden">
        <span className="font-semibold text-ellipsis whitespace-nowrap overflow-hidden">
         {track.name}
        </span>
        <span className="text-muted text-ellipsis whitespace-nowrap overflow-hidden">
         {track.artists.join(", ")}
        </span>
       </div>
      </div>
      {width > 500 && (
       <div className="flex items-center overflow-hidden">
        <span className="text-ellipsis whitespace-nowrap overflow-hidden">
         {track.album}
        </span>
       </div>
      )}
      {width > 350 && (
       <div className="flex items-center justify-center">
        <span>{track.duration.replace(".", ":")}</span>
       </div>
      )}
     </div>
    );
   })}
   <button
    className="p-5 font-semibold text-muted hover:text-white"
    onClick={() => setShowMore(!showMore)}
   >
    Show {showMore ? "less" : "more"}
   </button>
  </div>
 );
};

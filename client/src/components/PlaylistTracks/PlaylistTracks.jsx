import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { setCurrentTrack } from "../../utils/redux/playerSlice";
import { PlayIcon } from "../../assets/icons/PlayIcon";
import ClockIcon from "@heroicons/react/outline/ClockIcon";

const formatDate = (date) => {
 const dateFormat = {
  year: "numeric",
  month: "short",
  day: "numeric"
 };
 return date.toLocaleDateString(undefined, dateFormat);
};

const PlaylistTracks = ({ tracks, opacity, width }) => {
 const dispatch = useDispatch();

 return (
  <div className="w-full text-sm">
   <div
    className="px-2 mt-5 sticky top-[72px]"
    style={{
     backgroundColor: `rgba(18, 18, 18, ${opacity >= 1 ? "1" : "0"})`,
     transition: "background-color 300ms"
    }}
   >
    <div
     className="grid gap-4 px-4 py-2 border-b-2 border-[#ffffff11] mb-5 text-muted
          grid-cols-[1rem_1fr]
          @md:grid-cols-[1rem_3fr_minmax(60px,_1fr)]
          @xl:grid-cols-[1rem_4fr_2fr_minmax(120px,_1fr)]
          @2xl:grid-cols-[1rem_6fr_4fr_3fr_minmax(16px,_1fr)]"
    >
     <span>#</span>
     <span>Title</span>
     <span className="hidden @xl:flex">Album</span>
     <span className="hidden @2xl:flex">Date Added</span>
     <div className="hidden @md:flex justify-center">
      <ClockIcon className="w-5" />
     </div>
    </div>
   </div>
   <div className="px-2">
    {tracks?.map((track) => {
     const date = new Date(track.dateAdded);
     return (
      <div
       className="grid rounded-md group gap-4 px-4 hover:bg-[#ffffff22] text-muted  cursor-pointer
              grid-cols-[1rem_1fr]
              @md:grid-cols-[1rem_3fr_minmax(60px,_1fr)]
              @xl:grid-cols-[1rem_4fr_2fr_minmax(120px,_1fr)]
              @2xl:grid-cols-[1rem_6fr_4fr_3fr_minmax(16px,_1fr)]"
       key={track.id || nanoid()}
       onClick={() => {
        dispatch(setCurrentTrack(track.uri));
       }}
      >
       <span className="flex items-center justify-center group-hover:hidden">{track.index}</span>
       <button className="hidden items-center justify-center group-hover:flex">
        <PlayIcon size={10} />
       </button>
       <div className="flex items-center gap-4 py-2 overflow-hidden">
        <div className="h-[40px] w-[40px] min-h-[40px] min-w-[40px] bg-black">
         {track.image && (
          <img
           className="object-cover"
           alt="Song cover"
           src={track.image}
          />
         )}
        </div>
        <div className="overflow-hidden flex flex-col">
         <span className="text-ellipsis whitespace-nowrap overflow-hidden">{track.name}</span>
         <span className="text-ellipsis whitespace-nowrap overflow-hidden">
          {track.artists.join(", ")}
         </span>
        </div>
       </div>
       <div className="overflow-hidden flex items-center">
        <span className="text-ellipsis whitespace-nowrap overflow-hidden hidden @xl:flex">
         {track.album}
        </span>
       </div>
       <div className="overflow-hidden items-center hidden @2xl:flex">
        <span>{date.toLocaleDateString(undefined, formatDate)}</span>
       </div>
       <div className="items-center justify-center hidden @md:flex">
        <span>{track.duration.replace(".", ":")}</span>
       </div>
      </div>
     );
    })}
   </div>
  </div>
 );
};

export default PlaylistTracks;

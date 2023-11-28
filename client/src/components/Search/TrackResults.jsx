import { nanoid } from "@reduxjs/toolkit";

export const TrackResults = ({ searchResults }) => (
 <ul className="h-full overflow-y-scroll mt-[72px] px-2">
  {searchResults.tracks?.items.map((track) => (
   <li
    className="flex items-center gap-4 p-2 hover:bg-[#ffffff33] rounded-[10px] overflow-hidden"
    key={nanoid()}
   >
    <img
     className="w-12 h-12 rounded-[10px]"
     src={track.album.images[track.album.images.length - 1].url}
     alt={track.name}
    />
    <div className="flex flex-col overflow-hidden">
     <span className="text-ellipsis whitespace-nowrap overflow-hidden font-semibold">
      {track.name}
     </span>
     <span className="text-ellipsis whitespace-nowrap overflow-hidden text-muted">
      {track.artists[0].name}
     </span>
    </div>
   </li>
  ))}
 </ul>
);

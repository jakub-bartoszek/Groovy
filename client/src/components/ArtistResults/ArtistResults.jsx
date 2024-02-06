import { nanoid } from "@reduxjs/toolkit";
import { NavLink } from "react-router-dom";

const ArtistResults = ({ searchResults }) => (
 <ul className="overflow-y-scroll mt-[72px] p-2 gap-2 grid grid-cols-[repeat(auto-fit,_minmax(120px,_1fr))] grid-rows-[max-content]">
  {searchResults.artists?.items.map((artist) => (
   <li
    className="bg-[#181818] p-4 rounded-md flex"
    key={artist || nanoid()}
   >
    <NavLink
     className="flex flex-col gap-4 overflow-hidden"
     to={`/artists/${artist.id}`}
    >
     <div className="w-[85%] aspect-square rounded-full self-center shadow-xl">
      <img
       className="h-full w-full aspect-square rounded-full"
       src={artist.images[0]?.url}
       alt="Liked songs"
       crossOrigin="Anonymous"
      />
     </div>
     <div className="flex flex-col">
      <span className=" text-ellipsis overflow-hidden">{artist.name}</span>
      <span className="text-sm text-muted">Artist</span>
     </div>
    </NavLink>
   </li>
  ))}
 </ul>
);

export default ArtistResults;

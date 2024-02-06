import { nanoid } from "@reduxjs/toolkit";
import { NavLink } from "react-router-dom";
import { MusicNoteIcon } from "@heroicons/react/outline";

const PlaylistItem = ({ item, width, path, likedSongs }) => {
 const renderImage = () => {
  if (likedSongs) {
   return (
    <img
     className="h-11 w-11 rounded-md absolute"
     alt="Liked songs"
     src="https://misc.scdn.co/liked-songs/liked-songs-64.png"
    />
   );
  } else if (item.images[0]) {
   return (
    <img
     alt={item.name}
     className="h-11 w-11 rounded-md absolute"
     src={item?.images[item.images.length - 1]?.url}
    />
   );
  }
  return null;
 };

 return (
  <li key={(item && item.id) || nanoid()}>
   <NavLink to={path}>
    <div
     className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer playlist ${
      width <= 70 && "justify-center"
     }`}
    >
     <div className="h-11 w-11 rounded-md bg-[#282828] flex items-center justify-center relative">
      <MusicNoteIcon className="w-6 text-muted" />
      {renderImage()}
     </div>
     {width > 70 && (
      <div className="flex flex-col">
       <span className="font-semibold text-white">{likedSongs ? "Liked songs" : item.name}</span>
       <span className="text-sm">{!likedSongs && `Playlist • ${item.owner.display_name}`}</span>
      </div>
     )}
    </div>
   </NavLink>
  </li>
 );
};

export default PlaylistItem;

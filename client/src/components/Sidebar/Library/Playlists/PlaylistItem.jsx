import { nanoid } from "@reduxjs/toolkit";
import { NavLink } from "react-router-dom";
import { MusicNoteIcon } from "@heroicons/react/outline";

const PlaylistItem = ({ item, path, likedSongs }) => {
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

 return <div />;
};

export default PlaylistItem;

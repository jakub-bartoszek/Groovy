import { nanoid } from "@reduxjs/toolkit";
import { selectPlaylists } from "../../../../utils/redux/librarySlice";
import { useSelector } from "react-redux";
import PlaylistItem from "./PlaylistItem";

const Playlists = () => {
 const playlists = useSelector(selectPlaylists);

 return (
  <>
   <PlaylistItem
    key={nanoid()}
    path={`/liked`}
    name="Liked songs"
    likedSongs={true}
   />
   {playlists.map((playlist) => (
    <PlaylistItem
     key={playlist.id || nanoid()}
     path={`/playlists/${playlist.id}`}
     item={playlist}
    />
   ))}
  </>
 );
};

export default Playlists;

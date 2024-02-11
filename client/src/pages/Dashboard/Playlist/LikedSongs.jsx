import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
 fetchLikedSongs,
 selectLikedSongs,
 selectStatus
} from "../../../utils/redux/playlistSlice";
import Loader from "../../../components/Loader/Loader";
import Error from "../../../components/Error/Error";
import PlaylistWrapper from "../../../components/PlaylistWrapper/PlaylistWrapper";

const LikedSongs = ({ accessToken }) => {
 const dispatch = useDispatch();
 const likedSongs = useSelector(selectLikedSongs);
 const [queue, setQueue] = useState();
 const [tracks, setTracks] = useState([]);
 const status = useSelector(selectStatus);

 useEffect(() => {
  if (accessToken) {
   dispatch(fetchLikedSongs(accessToken));
  }
 }, [dispatch, accessToken]);

 useEffect(() => {
  if (likedSongs) {
   setQueue(likedSongs.map((track) => track.track.uri));
   setTracks(
    likedSongs.map((track, index) => {
     const {
      track: {
       id,
       name,
       artists,
       album,
       duration_ms,
       album: { images }
      }
     } = track;
     return {
      index: index + 1,
      id,
      name,
      artists: artists.map((artist) => artist.name),
      album: album.name,
      image: images[images.length - 1]?.url,
      duration: (duration_ms / 60000).toFixed(2).toString(),
      dateAdded: track.added_at,
      uri: track.track.uri
     };
    })
   );
  }
 }, [likedSongs]);

 switch (status) {
  case "loading":
   return <Loader />;
  case "error":
   return <Error />;
  case "success":
   return (
    <PlaylistWrapper
     tracks={tracks}
     image={"https://misc.scdn.co/liked-songs/liked-songs-300.png"}
     name={"Liked songs"}
     header={
      <div className="flex flex-col justify-between w-full">
       <span>Playlist</span>
       <div className="flex flex-col gap-4">
        <span className="font-bold text-3xl @xl:text-5xl @3xl:text-7xl">
         Liked songs
        </span>
       </div>
      </div>
     }
     queue={queue}
    />
   );
  default:
   return null;
 }
};

export default LikedSongs;

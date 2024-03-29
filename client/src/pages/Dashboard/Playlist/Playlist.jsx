import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPlaylist, selectPlaylist, selectStatus } from "../../../utils/redux/playlistSlice";
import { setBgColor, setOpacity } from "../../../utils/redux/colorsSlice";
import Loader from "../../../components/Loader/Loader";
import Error from "../../../components/Error/Error";
import PlaylistWrapper from "../../../components/PlaylistWrapper/PlaylistWrapper";

const Playlist = ({ accessToken }) => {
 const dispatch = useDispatch();
 const { id } = useParams();
 const scrollRef = useRef();
 const playlist = useSelector(selectPlaylist);
 const [tracks, setTracks] = useState([]);
 const [queue, setQueue] = useState();
 const status = useSelector(selectStatus);

 useEffect(() => {
  dispatch(setBgColor({ R: 18, G: 18, B: 18, A: 0 }));
  dispatch(setOpacity(0));
 }, [id]);

 useEffect(() => {
  if (scrollRef.current) {
   scrollRef.current.scrollTop = 0;
  }
 }, [id]);

 useEffect(() => {
  if (accessToken && id) {
   dispatch(fetchPlaylist({ accessToken, id }));
  }
 }, [dispatch, accessToken, id]);

 useEffect(() => {
  if (playlist && playlist.id === id) {
   setQueue(playlist.tracks.items.map((track) => track.track.uri));
   setTracks(
    playlist.tracks.items.map((track, index) => {
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
 }, [playlist, id]);

 const [mainImage] = playlist.images || [];

 switch (status) {
  case "loading":
   return <Loader />;
  case "error":
   return <Error />;
  case "success":
   return (
    <PlaylistWrapper
     playlist={playlist}
     tracks={tracks}
     image={mainImage && mainImage.url}
     name={playlist.name}
     header={
      <div className="flex flex-col justify-between">
       <div>Playlist</div>
       <div className="flex flex-col gap-4">
        <span className="font-bold text-3xl @xl:text-5xl @3xl:text-7xl">{playlist.name}</span>
        <div className="flex items-center gap-2">
         <span className="text-sm">
          <b>{playlist.owner.display_name}</b>
          {` • ${playlist.tracks.total} tracks`}
         </span>
        </div>
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

export default Playlist;

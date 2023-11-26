import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { PlaylistTracks } from "./PlaylistTracks";
import { useDispatch, useSelector } from "react-redux";
import { PlayButton } from "../common/PlayButton";
import {
 selectBgColor,
 selectOpacity,
 setBgColor,
 setOpacity
} from "../../utils/redux/colorsSlice";
import ColorThief from "colorthief/dist/color-thief.mjs";
import MusicNoteIcon from "@heroicons/react/outline/MusicNoteIcon";
import {
 fetchPlaylist,
 selectPlaylist,
 selectStatus
} from "../../utils/redux/playlistSlice";
import { Loader } from "../../assets/Loader";

export const Playlist = ({ accessToken, width }) => {
 const dispatch = useDispatch();
 const opacity = useSelector(selectOpacity);
 const { id } = useParams();
 const imageRef = useRef();
 const bgColor = useSelector(selectBgColor);
 const colorThief = new ColorThief();
 const scrollRef = useRef();
 const _ = require("lodash");
 const playlist = useSelector(selectPlaylist);
 const [tracks, setTracks] = useState([]);
 const [queue, setQueue] = useState();
 const status = useSelector(selectStatus);

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
     return {
      index: index + 1,
      id: track.track.id,
      name: track.track.name,
      artists: track.track.artists.map((artist) => artist.name),
      album: track.track.album.name,
      image: track.track.album.images[track.track.album.images.length - 1]?.url,
      duration: (track.track.duration_ms / 60000).toFixed(2).toString(),
      dateAdded: track.added_at,
      uri: track.track.uri
     };
    })
   );
  }
 }, [playlist, id]);

 return (
  <div className="h-full overflow-hidden relative rounded-[10px] text-white">
   {
    {
     loading: (
      <div className="w-full h-full flex items-center justify-center">
       <Loader />
      </div>
     ),
     error: <>Error</>,
     success: (
      <div
       className="h-full overflow-y-scroll bg-[#121212]"
       ref={scrollRef}
       onScroll={throttledScroll}
      >
       {playlist.id === id && (
        <>
         <div
          className={`w-full flex ${width > 550 ? "h-[350px]" : "h-[200px]"}`}
          style={{
           backgroundColor: `rgb(${bgColor.R}, ${bgColor.G}, ${bgColor.B})`,
           boxShadow: `0 0 200px 80px #000000aa, 0 0 200px 80px rgb(${bgColor.R}, ${bgColor.G}, ${bgColor.B})`,
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
            {playlist.images.length > 0 && (
             <img
              className="h-full w-full shadow-2xl object-cover absolute top-0"
              ref={imageRef}
              onLoad={() => {
               const img = imageRef.current;
               const R = colorThief.getColor(img)[0];
               const G = colorThief.getColor(img)[1];
               const B = colorThief.getColor(img)[2];

               dispatch(setBgColor({ R: R, G: G, B: B, A: 0 }));
              }}
              src={playlist.images[0].url}
              alt="Liked songs"
              crossOrigin="Anonymous"
             />
            )}
           </div>
           <div className="flex flex-col justify-between overflow-hidden">
            <div>Playlist</div>
            <div className="flex flex-col gap-4 overflow-hidden">
             <span
              className={`font-bold ${width >= 700 && "text-7xl"} ${
               width < 700 && width > 550 && "text-5xl"
              } ${width < 550 && "text-3xl"}`}
             >
              {playlist.name}
             </span>
             <div className="flex items-center gap-2">
              <span className="text-sm">
               <b>{playlist.owner.display_name}</b>
               {` • ${playlist.tracks.total} tracks`}
              </span>
             </div>
            </div>
           </div>
          </div>
         </div>
         {tracks.length > 0 ? (
          <>
           <PlayButton queue={queue} />
           <PlaylistTracks
            width={width}
            opacity={opacity}
            tracks={tracks}
           />
          </>
         ) : (
          <div className="flex justify-center p-10 text-muted">
           No tracks yet...
          </div>
         )}
        </>
       )}
      </div>
     )
    }[status]
   }
  </div>
 );
};

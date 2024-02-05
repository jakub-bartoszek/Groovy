import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
 selectBgColor,
 selectOpacity,
 setBgColor,
 setOpacity
} from "../../utils/redux/colorsSlice";
import { PlaylistTracks } from "./PlaylistTracks";
import PlayButton from "../PlayButton/PlayButton";
import { fetchLikedSongs, selectLikedSongs, selectStatus } from "../../utils/redux/playlistSlice";
import { Loader } from "../../assets/Loader";
import _ from "lodash";

const LikedSongs = ({ accessToken, width }) => {
 const dispatch = useDispatch();
 const [queue, setQueue] = useState();
 const opacity = useSelector(selectOpacity);
 const bgColor = useSelector(selectBgColor);
 const likedSongs = useSelector(selectLikedSongs);
 const scrollRef = useRef();
 const _ = require("lodash");
 const [tracks, setTracks] = useState();
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
 }, []);

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

 return (
  <div className="h-full overflow-hidden relative rounded-[10px] text-white">
   {status === "loading" && (
    <div className="w-full h-full flex items-center justify-center">
     <Loader />
    </div>
   )}
   {status === "error" && <>Error</>}
   {status === "success" && (
    <div
     className="h-full overflow-y-scroll bg-[#121212]"
     ref={scrollRef}
     onScroll={throttledScroll}
    >
     <div
      className={`w-full flex ${width > 550 ? "h-[350px]" : "h-[200px]"}`}
      style={{
       backgroundColor: `rgb(${bgColor.R}, ${bgColor.G}, ${bgColor.B})`,
       boxShadow: `0 0 200px 80px #000000aa, 0 0 200px 80px rgb(${bgColor.R}, ${bgColor.G}, ${bgColor.B})`,
       transition: "all 300ms linear"
      }}
     >
      <div className="flex self-end gap-4 w-full p-5 bg-gradient-to-t from-[#00000070]">
       <div className={`bg-black aspect-square ${width > 550 ? "h-48 w-48" : "h-24 w-24"}`}>
        <img
         className="h-full w-full shadow-2xl object-cover image"
         onLoad={() => {
          const R = 83;
          const G = 60;
          const B = 160;

          dispatch(setBgColor({ R: R, G: G, B: B }));
         }}
         src="https://misc.scdn.co/liked-songs/liked-songs-300.png"
         alt="Liked songs"
         crossOrigin="Anonymous"
        />
       </div>
       <div className="flex flex-col justify-between overflow-hidden">
        <span>Playlist</span>
        <div className="flex flex-col gap-4">
         <span
          className={`font-bold text-ellipsis overflow-hidden
                    ${width >= 700 && "text-7xl"}
                    ${width < 700 && width > 550 && "text-5xl"}
                    ${width < 550 && "text-3xl"}`}
         >
          Liked songs
         </span>
        </div>
       </div>
      </div>
     </div>
     <PlayButton queue={queue} />
     <PlaylistTracks
      width={width}
      opacity={opacity}
      tracks={tracks}
     />
    </div>
   )}
  </div>
 );
};

export default LikedSongs;

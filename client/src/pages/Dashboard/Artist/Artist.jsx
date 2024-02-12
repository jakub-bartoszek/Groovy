import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectBgColor, setBgColor, setOpacity } from "../../../utils/redux/colorsSlice.js";
import {
 fetchArtist,
 selectArtist,
 selectArtistTracks,
 selectStatus
} from "../../../utils/redux/artistSlice";
import ColorThief from "colorthief/dist/color-thief.mjs";
import ArtistTopTracks from "../../../components/ArtistTopTracks/ArtistTopTracks.jsx";
import Loader from "../../../components/Loader/Loader.jsx";
import Error from "../../../components/Error/Error.jsx";

const Artist = ({ accessToken }) => {
 const { id } = useParams();
 const artist = useSelector(selectArtist);
 const artistTracks = useSelector(selectArtistTracks);
 const { R, G, B } = useSelector(selectBgColor);
 const scrollRef = useRef();
 const dispatch = useDispatch();
 const colorThief = new ColorThief();
 const imageRef = useRef();
 const _ = require("lodash");
 const status = useSelector(selectStatus);

 const throttledScroll = useCallback(
  _.throttle(
   () => {
    dispatch(setOpacity(scrollRef.current.scrollTop / 300));
   },
   100,
   { leading: false }
  ),
  [setOpacity]
 );

 useEffect(() => {
  if (accessToken && id) {
   dispatch(fetchArtist({ accessToken, id }));
  }
 }, [id]);

 switch (status) {
  case "loading":
   return <Loader />;
  case "error":
   return <Error />;
  case "success":
   return (
    <div
     className="h-full overflow-y-scroll bg-[#121212] relative rounded-[10px] text-white"
     ref={scrollRef}
     onScroll={throttledScroll}
    >
     <div
      className="w-full flex h-[200px] @xl:h-[350px]"
      style={{
       backgroundColor: `rgb(${R}, ${G}, ${B})`,
       boxShadow: `0 0 200px 80px #000000aa, 0 0 200px 80px rgb(${R}, ${G}, ${B})`
      }}
     >
      <div className="flex self-end gap-4 w-full p-5 bg-gradient-to-t from-[#00000070]">
       <div className="bg-black rounded-full aspect-square h-24 w-24 @xl:h-48 @xl:w-48">
        {artist.images && artist.images.length > 0 && (
         <img
          className="h-full w-full shadow-2xl image object-cover rounded-full"
          ref={imageRef}
          onLoad={() => {
           const img = imageRef.current;
           const R = colorThief.getColor(img)[0];
           const G = colorThief.getColor(img)[1];
           const B = colorThief.getColor(img)[2];

           dispatch(setBgColor({ R: R, G: G, B: B, A: 0 }));
          }}
          src={artist.images[0].url}
          alt={artist.name}
          crossOrigin="Anonymous"
         />
        )}
       </div>
       <div className="flex flex-col justify-between drop-shadow-md overflow-hidden">
        <span>Artist</span>
        <span className="font-bold text-4xl @xl:text-7xl">
         <h1 className="text-ellipsis whitespace-nowrap overflow-hidden">{artist.name}</h1>
        </span>
        <span>{artist.followers && artist.followers.total} followers</span>
       </div>
      </div>
     </div>
     {artistTracks.tracks && (
      <ArtistTopTracks
       accessToken={accessToken}
       tracks={artistTracks.tracks}
      />
     )}
    </div>
   );
  default:
   return null;
 }
};

export default Artist;

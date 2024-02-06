import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectBgColor, setBgColor, setOpacity } from "../../../utils/redux/colorsSlice.js";
import { fetchArtist, selectArtist, selectArtistTracks } from "../../../utils/redux/artistSlice";
import ColorThief from "colorthief/dist/color-thief.mjs";
import ArtistTopTracks from "../../../components/ArtistTopTracks/ArtistTopTracks.jsx";

const Artist = ({ width, accessToken }) => {
 const { id } = useParams();
 const artist = useSelector(selectArtist);
 const artistTracks = useSelector(selectArtistTracks);
 const bgColor = useSelector(selectBgColor);
 const scrollRef = useRef();
 const dispatch = useDispatch();
 const colorThief = new ColorThief();
 const imageRef = useRef();
 const _ = require("lodash");

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

 return (
  <div className="h-full overflow-hidden relative rounded-[10px] text-white">
   {artist && (
    <div
     className="h-full overflow-y-scroll bg-[#121212]"
     ref={scrollRef}
     onScroll={throttledScroll}
    >
     <div
      className={`w-full flex ${width > 550 ? "h-[350px]" : "h-[200px]"}`}
      style={{
       backgroundColor: `rgb(${bgColor.R}, ${bgColor.G}, ${bgColor.B})`,
       boxShadow: `0 0 200px 80px #000000aa, 0 0 200px 80px rgb(${bgColor.R}, ${bgColor.G}, ${bgColor.B})`
      }}
     >
      <div className="flex self-end gap-4 w-full p-5 bg-gradient-to-t from-[#00000070]">
       <div
        className={`bg-black rounded-full aspect-square ${width > 550 ? "h-48 w-48" : "h-24 w-24"}`}
       >
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
        <span className={`font-bold ${width < 700 ? "text-4xl" : "text-7xl"}`}>
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
       width={width}
      />
     )}
    </div>
   )}
  </div>
 );
};

export default Artist;

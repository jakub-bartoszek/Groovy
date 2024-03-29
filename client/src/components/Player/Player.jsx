import { useSelector } from "react-redux";
import { selectCurrentTrack, selectIsPlaying, selectQueue } from "../../utils/redux/playerSlice";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ accessToken }) => {
 const track = useSelector(selectCurrentTrack);
 const queue = useSelector(selectQueue);
 const isPlaying = useSelector(selectIsPlaying);

 return (
  <div className="col-span-2 flex items-center">
   <SpotifyPlayer
    locale={true}
    name="Groovy"
    syncExternalDevice={true}
    showSaveIcon={true}
    play={isPlaying}
    uris={[...track, ...queue]}
    token={accessToken}
    styles={{
     activeColor: "#1cb954",
     bgColor: "#000000",
     color: "#fff",
     loaderColor: "#fff",
     sliderColor: "#1cb954",
     sliderHandleColor: "#fff",
     sliderTrackColor: "#666",
     trackArtistColor: "#ccc",
     trackNameColor: "#fff"
    }}
   />
  </div>
 );
};

export default Player;

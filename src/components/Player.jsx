import { useSelector } from "react-redux";
import SpotifyPlayer from "react-spotify-web-playback";
import {
	selectCurrentTrack,
	selectIsPlaying
} from "../utils/spotifyDataSlice";

export const Player = ({ token }) => {
	const track = useSelector(selectCurrentTrack);
	const isPlaying = useSelector(selectIsPlaying);

	return (
		<div className="bg-red-500 col-span-2">
			<SpotifyPlayer
				play={isPlaying}
				uris={track}
				token={token}
				styles={{
					activeColor: "#fff",
					bgColor: "#000",
					color: "#fff",
					loaderColor: "#fff",
					sliderColor: "#1cb954",
					trackArtistColor: "#ccc",
					trackNameColor: "#fff"
				}}
			/>
		</div>
	);
};

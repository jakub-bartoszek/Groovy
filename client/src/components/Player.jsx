import { useSelector } from "react-redux";
import SpotifyPlayer from "react-spotify-web-playback";

import {
	selectCurrentTrack,
	selectIsPlaying,
	selectQueue
} from "../utils/spotifyDataSlice";

export const Player = ({ token }) => {
	const track = useSelector(selectCurrentTrack);
	const queue = useSelector(selectQueue);
	const isPlaying = useSelector(selectIsPlaying);

	return (
		<div className="col-span-2">
			<SpotifyPlayer
				locale={true}
				name="Groovy"
				syncExternalDevice={true}
				showSaveIcon={true}
				play={isPlaying}
				uris={track.concat(queue)}
				token={token}
				styles={{
					activeColor: "#1cb954",
					bgColor: "#000000",
					color: "#fff",
					loaderColor: "#fff",
					sliderColor: "#1cb954",
					sliderHandleColor: "#fff",
					sliderTrackColor: "#666",
					trackArtistColor: "#ccc",
					trackNameColor: "#fff",

				}}
			/>
		</div>
	);
};

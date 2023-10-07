import SpotifyPlayer from "react-spotify-web-playback";

export const Player = ({ token }) => {
	console.log(token);
	return (
		<div className="bg-red-500 col-span-2">
			<SpotifyPlayer token={token}></SpotifyPlayer>
		</div>
	);
};

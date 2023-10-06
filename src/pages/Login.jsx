import React from "react";
import useAuth from "../utils/useAuth";

export default function Login({ code }) {
	const clientId = "34b03478831b4560911d57f64b00b9ea";
	const redirectUri = "http://localhost:3000";
	const apiUrl = "https://accounts.spotify.com/authorize";
	const scope = [
		"user-read-email",
		"user-read-private",
		"user-modify-playback-state",
		"user-read-playback-state",
		"user-read-currently-playing",
		"user-read-recently-played",
		"user-read-playback-position",
		"user-top-read",
		"playlist-read-collaborative"
	];
	const AUTH_URL = `${apiUrl}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope.join("%20")}`;
 	
	return (
		<div className="flex justify-center h-[100vh] items-center">
			<button className=" bg-green-600 text-white p-4 h-[max-content] font-bold text-3xl rounded-xl">
				<a href={AUTH_URL}>Login with Spotify</a>
			</button>
		</div>
	);
}

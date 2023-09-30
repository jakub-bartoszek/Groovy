import React from "react";

export default function Login() {
	const handleClick = () => {
		const clientId = "34b03478831b4560911d57f64b00b9ea";
		const redirectUri = "http://localhost:3000/";
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
		window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope.join(
			" "
		)}&response_type=token&show_dialog=true`;
	};

	return <button onClick={handleClick}>Login</button>;
}

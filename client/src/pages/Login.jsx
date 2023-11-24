import { useDispatch, useSelector } from "react-redux";
import {
	selectClientId,
	selectClientSecret,
	setClientId,
	setClientSecret
} from "../utils/redux/spotifySlice";
import { useState } from "react";

export default function Login() {
	const dispatch = useDispatch();
	const [clientId, setClientId] = useState("");
	const [clientSecret, setClientSecret] = useState("");
	const redirectUri = JSON.parse(localStorage.getItem("redirect_uri"));
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
		"playlist-read-collaborative",
		"streaming",
		"user-library-read",
		"user-library-modify"
	];
	const AUTH_URL = `${apiUrl}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope.join(
		"%20"
	)}`;

	return (
		<div className="flex justify-center h-[100vh] items-center bg-[#121212] text-white">
			<form className="flex flex-col gap-8">
				<label className="flex flex-col ">
					Client id:
					<input
						className="text-black"
						value={clientId}
						onChange={(e) => {
							setClientId(e.target.value);
							localStorage.setItem("client_id", JSON.stringify(e.target.value));
						}}
					/>
				</label>
				<label className="flex flex-col ">
					Client secret:
					<input
						className="text-black"
						value={clientSecret}
						onChange={(e) => {
							setClientSecret(e.target.value);
							localStorage.setItem(
								"client_secret",
								JSON.stringify(e.target.value)
							);
						}}
					/>
				</label>
				<button className=" bg-green-600 p-4 h-[max-content] font-bold text-3xl rounded-xl">
					<a href={AUTH_URL}>Login with Spotify</a>
				</button>
			</form>
		</div>
	);
}

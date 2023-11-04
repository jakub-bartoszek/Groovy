const clientId = "34b03478831b4560911d57f64b00b9ea";
const redirectUri = "https://groovy-wrnj.onrender.com";
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

export default function Login() {
	return (
		<div className="flex justify-center h-[100vh] items-center bg-[#121212]">
			<button className=" bg-green-600 text-white p-4 h-[max-content] font-bold text-3xl rounded-xl">
				<a href={AUTH_URL}>Login with Spotify</a>
			</button>
		</div>
	);
}

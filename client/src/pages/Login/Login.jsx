import { useState } from "react";

const Login = () => {
 const [clientId, setClientId] = useState(
  JSON.parse(localStorage.getItem("client_id")) || ""
 );
 const [clientSecret, setClientSecret] = useState(
  JSON.parse(localStorage.getItem("client_secret")) || ""
 );
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

 const handleInputChange = (e, setState, storageKey) => {
  const value = e.target.value;
  setState(value);
  localStorage.setItem(storageKey, JSON.stringify(value));
};

 return (
  <div className="flex justify-center h-[100vh] items-center bg-[#121212] text-white">
    <form className="flex flex-col gap-8">
      <label className="flex flex-col ">
        <span className="text-muted">Client id:</span>
        <input
          className="p-2 rounded-full bg-[#181818]"
          value={clientId}
          onChange={(e) => handleInputChange(e, setClientId, "client_id")}
        />
      </label>
      <label className="flex flex-col ">
        <span className="text-muted">Client secret:</span>
        <input
          className="p-2 rounded-full bg-[#181818]"
          value={clientSecret}
          onChange={(e) => handleInputChange(e, setClientSecret, "client_secret")}
        />
      </label>
      <button className=" bg-green-600 p-4 h-[max-content] font-bold text-3xl rounded-xl">
        <a href={AUTH_URL}>Login with Spotify</a>
      </button>
    </form>
  </div>
);
};

export default Login;

import axios from "axios";

export const getArtistTracks = async (accessToken, id) => {
 if (accessToken && id) {
  const response = await axios.get(
   `https://api.spotify.com/v1/artists/${id}/top-tracks?market=PL`, {
   headers: {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json"
   }
  }
  );
  return await response.data;
 }
};


import axios from "axios";

export const getArtist = async (accessToken, id) => {
 if (accessToken && id) {
  const response = await axios.get(
   `https://api.spotify.com/v1/artists/${id}`, {
   headers: {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json"
   }
  }
  );
  return await response.data;
 }
};
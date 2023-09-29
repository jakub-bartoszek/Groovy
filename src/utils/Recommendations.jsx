import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "./spotifyDataSlice";

export const Recommendations = () => {
	const { token } = useSelector(selectToken);

	useEffect(() => {
		const getRecommendationsData = async () => {
			const response = await axios.get(
				"https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA",
				{
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json"
					}
				}
			);
		};
		getRecommendationsData();
	}, []);

	return <div className=" bg-pink-800">Recommendations</div>;
};

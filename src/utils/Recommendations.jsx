import { useEffect } from "react";
import { useStateProvider } from "./StateProvider";
import axios from "axios";

export const Recommendations = () => {
	const [{ token, dispatch }] = useStateProvider();
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
	}, [token, dispatch]);

	return <div className=" bg-pink-800">Recommendations</div>;
};

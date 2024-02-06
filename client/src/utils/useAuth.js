import { useEffect, useState } from 'react';
import axios from 'axios';

export const useAuth = (code) => {
	const [accessToken, setAccessToken] = useState();
	const [refreshToken, setRefreshToken] = useState();
	const [expiresIn, setExpiresIn] = useState();
	const clientId = JSON.parse(localStorage.getItem("client_id"));
	const clientSecret = JSON.parse(localStorage.getItem("client_secret"));
	const redirectUri = JSON.parse(localStorage.getItem("redirect_uri"));

	useEffect(() => {
		axios.post(`http://localhost:3001/login`, { code, clientId, clientSecret, redirectUri })
			.then(res => {
				setAccessToken(res.data.accessToken);
				setRefreshToken(res.data.refreshToken);
				setExpiresIn(res.data.expiresIn);
				window.history.pushState({}, null, `/`);
			})
			.catch((err) => {
				console.log(err.message);

			});
	}, [code, clientId, clientSecret, redirectUri]);


	useEffect(() => {
		if (!refreshToken || !expiresIn) return;
		const interval = setInterval(() => {

			axios.post(`http://localhost:3001/refresh`, { refreshToken, clientId, clientSecret, redirectUri })
				.then(res => {
					setAccessToken(res.data.accessToken);
					setExpiresIn(res.data.expiresIn);
				})
				.catch((err) => {
					console.log(err.message);
				});
		}, (expiresIn - 60) * 1000);

		return () => clearInterval(interval);
	}, [refreshToken, expiresIn]);

	return accessToken;
};

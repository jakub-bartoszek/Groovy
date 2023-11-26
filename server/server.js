require('dotenv').config();
const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/refresh", (req, res) => {
	const refreshToken = req.body.refreshToken;
	const spotifyApi = new spotifyWebApi({
		redirectUri: req.body.redirectUri,
		clientId: req.body.clientId,
		clientSecret: req.body.clientSecret,
		refreshToken
	});

	console.log(process.env.REDIRECT_URI);

	spotifyApi.refreshAccessToken()
		.then(data => {
			res.json({
				accessToken: data.body.access_token,
				expiresIn: data.body.expires_in,
			});
		})
		.catch(() => {
			res.sendStatus(400);
		});
});

app.post("/login", (req, res) => {
	const code = req.body.code;
	const spotifyApi = new spotifyWebApi({
		redirectUri: req.body.redirectUri,
		clientId: req.body.clientId,
		clientSecret: req.body.clientSecret,
	});

	spotifyApi.authorizationCodeGrant(code)
		.then(data => {
			res.json({
				accessToken: data.body.access_token,
				refreshToken: data.body.refresh_token,
				expiresIn: data.body.expires_in
			});
		}).catch(() => {
			res.sendStatus(400);
		});
});

app.listen(3000);

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

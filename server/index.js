const express = require("express");

const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");
const path = require('path');
const serverless = require('serverless-http');
const router = express.router();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

router.get("/", (req, res) => {
  res.json({
    'hello': 'hi!'
  })
})

app.use('/.netlify/functions/index')

const PORT = process.env.PORT || 3000;


app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "34b03478831b4560911d57f64b00b9ea",
    clientSecret: "19514650a4af4aaa90fd3c33dd87eeba",
    refreshToken
  });
  spotifyApi.refreshAccessToken().then(data => {
    res.json({
      accessToken: data.body.access_token,
      expiresIn: data.body.expires_in
    });
  }).catch(() => {
    res.sendStatus(400);
  });
});

app.post('/login', (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "34b03478831b4560911d57f64b00b9ea",
    clientSecret: "19514650a4af4aaa90fd3c33dd87eeba"
  });

  spotifyApi.authorizationCodeGrant(code).then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    });
  }).catch(() => {
    res.sendStatus(400);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(express.static(path.resolve(__dirname, '../public')));


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/public/index.html'));
});

module.exports.handler = serverless(app)

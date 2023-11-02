const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/refresh", (req, res) => {

  const refreshToken = req.body.refreshToken;
  const spotifyApi = new spotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '34b03478831b4560911d57f64b00b9ea',
    clientSecret: '19514650a4af4aaa90fd3c33dd87eeba',
    refreshToken
  });

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
    redirectUri: 'http://localhost:3000',
    clientId: '34b03478831b4560911d57f64b00b9ea',
    clientSecret: '19514650a4af4aaa90fd3c33dd87eeba'
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

app.listen(3001);

// app.use(express.static(path.resolve(__dirname, '/public')));


// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '/public/index.html'));
// });

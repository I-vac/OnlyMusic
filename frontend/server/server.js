/*const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser")
const spotifyWebApi = require("spotify-web-api-node");

const app = express();
app.use(cors())
app.use(bodyParser.json())

app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new spotifyWebApi({
        redirectUri : "http://localhost:3000",
        clientId: "4a799a6a64014ba48cc5b6f3b9b2ada4",
        clientSecret: "540c840d299f4acdb9462de94ad8aeef",
        refreshToken
    })

    spotifyApi.refreshAccessToken()
    .then(data => {
           res.json({
               accessToken : data.body.access_token,
               expiresIn : data.body.expires_in,
           })
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
     
})


app.post("/login", (req, res) => {
    const code = req.body.code
    const spotifyApi = new spotifyWebApi({
        redirectUri : "http://localhost:3000",
        clientId: "4a799a6a64014ba48cc5b6f3b9b2ada4",
        clientSecret: "540c840d299f4acdb9462de94ad8aeef"
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken : data.body.access_token,
            refreshToken : data.body.refresh_token,
            expiresIn : data.body.expires_in
        })
    }).catch(() => {
        res.sendStatus(400)
    })
})

app.listen(3001)*/
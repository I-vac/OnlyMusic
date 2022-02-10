import { useEffect, useState } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ accessToken: SpotifyAPIAccessToken, trackUri }) {
    const [play, setPlay] = useState(false)
    useEffect(() => setPlay(true), [trackUri])


    const [next, setNext] = useState(false)
    useEffect(() => setNext(true), [trackUri])


    if (!SpotifyAPIAccessToken) return null
    return <SpotifyPlayer
        token={SpotifyAPIAccessToken}
        showSaveIcon
        callback={state => {
            if (!state.isPlaying) setPlay(false)
        }}
        play={play}
        next={next}

        uris={trackUri ? [trackUri] : []}
        styles={{
            sliderColor: "#ff713e",
            activeColor: "#ff713e",
        }}
    />



}
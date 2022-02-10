import React from "react"
import { Container } from "react-bootstrap"
import "./Login.css"


const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=4a799a6a64014ba48cc5b6f3b9b2ada4&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


export default function Login() {
    return (
        <Container
            className="login"
            style={{ minHeight: "100vh" }}
        >

            <h1 style={{
                position: "absolute",
                left: "200px",
                top: "210px",
            }}>
                OnlyMusic
            </h1>


            <p style={{ position: "absolute", left: "205px", top: "320px", width: "300px" }}>
                Listen to your favourite songs and support the artists like never before!
            </p>


            <a className="btn btn-success btn-lg" href={AUTH_URL} style={{ position: "absolute", left: "240px", top: "490px" }}>
                LOG IN
            </a>


            <img
                src="https://tinyimg.io/i/tjcigSH.png"
                alt="OnlyMusic logo"
                style={{
                    position: "absolute",
                    left: "800px",
                    top: "150px"
                }}
            />

        </Container>
    )
}
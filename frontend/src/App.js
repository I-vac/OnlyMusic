import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./pages/Authentication";

import AuthService from "./services/auth.service";


import EventBus from "./common/EventBus";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "./Login"
import Dashboard from "./Dashboard"
import { useNavigate } from "react-router-dom";
import Authentication from "./pages/Authentication";
import SignUp from "./pages/SignUp";
import { Routes, Route, useLocation } from "react-router-dom";

const code = new URLSearchParams(window.location.search).get("code")




function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showArtistBoard, setShowArtistBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowArtistBoard(user.roles.includes("ROLE_ARTIST"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      AuthService.logout();
      setShowArtistBoard(false);
      setShowAdminBoard(false);
      setCurrentUser(undefined);
      navigate("/login");
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [navigate]);

  useEffect(() => {
    const hasUser = localStorage.getItem("user")
    if (hasUser) {
      if (!loggedIn) {
        navigate("/app/")
      }
      setloggedIn(true)
    } else {
      if (location.pathname === "/register") {
        return
      }

      navigate("/login")
    }
  }, [location.pathname, loggedIn, navigate])

  return code ?
    <>
      <Routes>
        <Route exact path="/login" element={<Authentication />} />
        <Route exact path="/register" element={<SignUp />} />
      </Routes>
      <Dashboard code={code} />
    </>
    : <Login />
}

export default App;
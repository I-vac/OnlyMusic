import { useState, useEffect } from "react"
import { Form } from "react-bootstrap"
import useAuth from "./useAuth"
import TrackSearchResult from "./TrackSearchResult"
import Player from "./Player"
import User from "./Users"
import Artist from "./Artist"
import SpotifyWebApi from "spotify-web-api-node"


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import userService from './services/user.service';
import authService from './services/auth.service';


import Home from "./component/Home";
import Profile from "./pages/Profile";
import Playlists from "./pages/Playlists";
// import BoardUser from "./component/BoardUser";
// import BoardAdmin from "./component/BoardAdmin";
// import BoardArtist from "./component/BoardArtist";

import { Routes, Route, Link, useLocation } from "react-router-dom";
import eventBus from "./common/EventBus"
//import Messaging from "./Messaging"
import Chat from "./websocket-chat/chat/Chat"


const spotifyApi = new SpotifyWebApi({
  clientId: "4a799a6a64014ba48cc5b6f3b9b2ada4"
})

const playerHeight = 60;
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

export default function Dashboard({ code }) {
  const location = useLocation()
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [stats, setStats] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
  }

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    userService.getUserStats().then((res => setStats(res.data)));

    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(res.body.tracks.items.map(track => {
        const smallestAlbumImage = track.album.images.reduce(
          (smallest, image) => {
            if (image.height < smallest.height) return image
            return smallest
          }, track.album.images[0])

        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImage.url
        }
      }))
    })
    return () => cancel = true
  }, [search, accessToken])


  const getLoginStats = () => {
    const created = Number(stats.created);
    const now = Number(stats.now);
    const loginCount = stats.loginCount;
    const days = ((now - created) / (1000 * 3600 * 24)) + 1;

    return `Analytics: ${loginCount} logins in last ${days.toFixed(0)} days`;
  };

  return location.pathname.includes("/app/") && (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />



      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={true}
      >

        <List className="pt-0">
          <ListItem className="p-0" >
            <img src="https://tinyimg.io/i/0br7GEJ.png" alt="banner" style={{
              width: `${drawerWidth}px`,

            }}>

            </img>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Avatar sx={{ bgcolor: deepOrange[500] }}>IN</Avatar>
            </ListItemIcon>
            <ListItemText primary={authService.getCurrentUser().username}/>
          </ListItem>
          <ListItem style={{paddingLeft: '1rem'}}>
          
            <ListItemIcon>
              <AnalyticsIcon style={{fontSize: '40px'}}/>
            </ListItemIcon>
            <ListItemText  primary={getLoginStats()}/>
          </ListItem>
        </List>
        <Divider />
        <List>
          <Link to="/app/playlists" style={{ color: '#000', textDecoration: 'none' }}>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="My Playlist" />
            </ListItem>
          </Link>
          <Link to="/app/chat" style={{ color: '#000', textDecoration: 'none' }}>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Web Chat" />
            </ListItem>
          </Link>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Genres" />
          </ListItem>
          <ListItem button onClick={() => eventBus.dispatch("logout")}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>


      </Drawer>

      <Main open={true} style={{
        height: `calc(100vh - ${playerHeight}px)`,
      }}>
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-column py-2">

              <Form.Control
                type="search"
                placeholder="Search for a song or an artist"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: "250px",
                  borderRadius: "10px",
                }}
              />

              <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                {searchResults.map(track => (
                  <TrackSearchResult
                    track={track}
                    key={track.uri}
                    chooseTrack={chooseTrack} />
                ))}
              </div>

              <p className="w3-dropdown-hover" style={{
                height: "100px",
                width: "90px",
                position: "absolute",
                top: "10px",
                right: "45px"
              }}>
                Active Users
                <span className="w3-dropdown-content w3-green w3-padding">
                  <User />
                </span>
              </p>
              <p className="w3-dropdown-hover" style={{
                height: "100px",
                width: "90px",
                position: "absolute",
                top: "10px",
                right: "95px"
              }}>
                Artists
                <span className="w3-dropdown-content w3-green w3-padding">
                  <Artist />
                </span>
              </p>
            </div>
            <div className="content">
              <Routes>
                <Route exact path="/app/" element={<Home />} />
                <Route exact path="/app/home" element={<Home />} />
                <Route exact path="/app/profile" element={<Profile />} />
                <Route exact path="/app/playlists" element={<Playlists />} />
                <Route exact path="/app/chat" element={<Chat />} />
                {/* <Route path="/user" element={<BoardUser />} />
                <Route path="/artist" element={<BoardArtist />} />
                <Route path="/admin" element={<BoardAdmin />} /> */}
              </Routes>
            </div>
          </div>
        </div>
      </Main>

      <div style={{
        height: `${playerHeight}px`,
        position: "absolute",
        bottom: 0,
        width: "100%",
        zIndex: "10000",
        padding: "0 20px",
        backgroundColor: "#fff",
      }}><Player
          accessToken={accessToken}
          trackUri={playingTrack?.uri}
        /></div>

    </Box>
  )
}
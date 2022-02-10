import axios from "axios";
import React from "react";

const ARTIST_URL = "http://localhost:8080/artists/all";

export default function Artist() {
  return <div></div>
  const [artists, setArtists] = React.useState([]);

  React.useEffect(() => {
    axios.get(ARTIST_URL).then((response) => {
      setArtists(response.data);
    });
  }, []);

  if (!artists) return null;


  return artists.map((artist =>
    <div>
      {artist.artistName} {artist.description}
    </div>
  ))
}
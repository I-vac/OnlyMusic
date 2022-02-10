function FavouriteSongs(artist, trackId, trackUri, dateAdded, favourite/*array from track*/) {
    this.artist = artist;
    this.trackId = trackId;
    this.trackUri = trackUri;
    this.dateAdded = dateAdded;
    this.favourite = favourite;
}

export default FavouriteSongs;
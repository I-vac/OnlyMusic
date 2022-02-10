function Playlist(namePlaylist, idPlaylist,/*array from track,*/ dateCreated, dateModified, dateLastListen, createdByUserId) {
    this.namePlaylist = namePlaylist;
    this.idPlaylist = idPlaylist;
    this.dateCreated = dateCreated;
    this.dateModified = dateModified;
    this.dateLastListen = dateLastListen;
    this.createdByUserId = createdByUserId;
}

export default Playlist;
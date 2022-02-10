import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Playlist from '../models/playlist';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};



export function PlaylistCard({ playlist }) {

  return (
    <div className="col-4 mb-4">
      <Card className="col-12" sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {playlist.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {playlist.dateCreated.toISOString()}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={`https://via.placeholder.com/150/?Text=${playlist.name}`}
          alt="Live from space album cover"
        />
      </Card>
    </div>
  );
}

function Playlists() {
  const playlist = new Playlist("Azis", 1, new Date(), new Date(), new Date(), 1)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className="mb-4" style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Button onClick={handleOpen} variant="outlined"
          style={{
            color: "#ff713e",
            borderColor: "#ff713e"
          }}
        >
          Create new Playlist
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create a new Playlist
            </Typography>
            <div className="my-4 w-100">
              <TextField fullWidth id="filled-basic" label="Name of Playlist" variant="filled" />
            </div>
            <div>
              <Button>
                Create
              </Button>
            </div>
          </Box>
        </Modal>
      </div>

      <div className="row" style={{ display: "flex" }}>
        <PlaylistCard playlist={playlist} />
        <PlaylistCard playlist={playlist} />
        <PlaylistCard playlist={playlist} />
        <PlaylistCard playlist={playlist} />
      </div>
      {/* <CreatePlaylistModal/> */}
    </div>
  )
}

export default Playlists

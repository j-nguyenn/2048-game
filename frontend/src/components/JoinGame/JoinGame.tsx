import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import GameContext from "../../gameContext";

const MAX_OBSTACLES = 4;

interface Props {
  onRoomSettings: (payload: {
    roomName: string;
    numberOfObstacles: number;
  }) => void;
}
export default function JoinGame(props: Props) {
  const { isInRoom } = React.useContext(GameContext);
  const [open, setOpen] = React.useState(!isInRoom);
  const [roomName, setRoomName] = React.useState(undefined);
  const [numberOfObstacles, setNbOfObstacles] = React.useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Game Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the room name you want to join
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Room name"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setRoomName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>Choose number of obstacles</DialogContentText>
          <RadioGroup
            row
            name="row-radio-buttons-group"
            value={numberOfObstacles}
            onChange={(e: any) => {
              setNbOfObstacles(e.target.value);
            }}
          >
            {[...Array(MAX_OBSTACLES).keys()].map((nb) => (
              <FormControlLabel
                key={nb}
                value={nb}
                control={<Radio />}
                label={nb}
              />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              props.onRoomSettings({ roomName, numberOfObstacles });
              handleClose();
            }}
          >
            Start game
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

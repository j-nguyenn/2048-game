import * as React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Board from "../Board";
import { Cell } from "../Cell";
import useGame from "../logic/useGame";
import useSlide from "../hooks/useSlide";
import GameContext from "../../gameContext";
import { Chat } from "../Chat";

const useStyles = makeStyles(() => {
  return createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",

      "& > div": {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      },
    },
    header: {
      padding: 24,
    },
    controller: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  });
});

const Game: React.FC = () => {
  const { isGameStarted, roomSettings } = React.useContext(GameContext);
  const { grid, changing, onNewGame, slideTo } = useGame();
  const classes = useStyles({});
  const slideHandlers = useSlide(slideTo, changing);

  return (
    <div className={classes.root}>
      {!isGameStarted ? (
        <div className={classes.header}>
          Waiting for another player to join ..
        </div>
      ) : (
        <div className={classes.header}>
          <span>Room: {roomSettings.roomName}</span>
          {roomSettings.numberOfObstacles > 0 && (
            <span>Number of obstacles: {roomSettings.numberOfObstacles}</span>
          )}
        </div>
      )}
      <div>
        <Board {...slideHandlers}>
          {grid !== null &&
            grid.map((row, y) => {
              return row.map((cell, x) => {
                if (cell === 0) return null;
                return <Cell x={x} y={y} value={cell} />;
              });
            })}
        </Board>
        <Chat />
      </div>
    </div>
  );
};

export default Game;

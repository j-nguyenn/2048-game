import * as React from "react";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { Theme } from "@mui/material";
import BoardCell from "../BoardCell";
import { NUMBER_OF_TILES } from '../utils/constants'
import { BoardProps } from "./types";

const useStyles = makeStyles<Theme>((theme) => {
  return createStyles({
    root: {
      position: "relative",
      width: "50vw",
      maxWidth: 960,
      height: "50vw",
      maxHeight: 960,
      backgroundColor: "#a1887f",
      borderRadius: 4,
    },
  });
});


const Board: React.FC<BoardProps> = ({ children, ...slideHandlers }) => {
  const classes = useStyles({});
  const cells: any[][] = Array(NUMBER_OF_TILES).fill(Array(NUMBER_OF_TILES).fill(null));

  return (
    <div className={classes.root} {...slideHandlers}>
      {cells.map((row, x) => {
        return row.map((cell, y) => {
          return <BoardCell key={`board-cell-${x}-${y}`} x={x} y={y} />;
        });
      })}
      {children}
    </div>
  );
};

export default Board;

import * as React from "react";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { Theme } from "@mui/material/";

import { BoardCellProps, StylesProps } from "./types";
import { NUMBER_OF_TILES } from "../utils/constants";

const useStyles = makeStyles<Theme, StylesProps>(() => {
  return createStyles({
    root: ({ x, y }: any) => {
      const width = `(100% - ${NUMBER_OF_TILES+1} * 10px) / ${NUMBER_OF_TILES}`;
      return {
        position: "absolute",
        top: `calc(${width}  * ${y} + 10px * ${y + 1})`,
        left: `calc(${width} * ${x} + 10px * ${x + 1})`,

        width: `calc(${width})`,
        height: `calc(${width})`,

        backgroundColor: "#8ab6a1",
        borderRadius: 4,
      };
    },
  });
});

const BoardCell: React.FC<BoardCellProps> = ({ x, y }) => {
  const classes = useStyles({ x, y });

  return <div className={classes.root} />;
};

export default BoardCell;

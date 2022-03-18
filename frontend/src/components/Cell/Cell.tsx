import * as React from "react";
import cx from "classnames";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
import { CellProps } from "./types";
import { getColors, NUMBER_OF_TILES } from "../utils/constants";


const useStyles = makeStyles<Theme, Omit<CellProps, "className">>(() => {
  const width = `(100% - ${NUMBER_OF_TILES + 1} * 10px) / ${NUMBER_OF_TILES}`;
  return createStyles({
    root: ({ x, y, value }) => {
      const color = getColors(value);
      return {
        position: "absolute",
        top: `calc(${width}  * ${y} + 10px * ${y + 1})`,
        left: `calc(${width} * ${x} + 10px * ${x + 1})`,

        width: `calc(${width})`,
        height: `calc(${width})`,

        backgroundColor: color,
        borderRadius: 4,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "& > *": {
          color: "white",
          userSelect: "none",
        },
      };
    },
  });
});

const Cell: React.FC<CellProps> = ({ className = "", x, y, value }) => {
  const classes = useStyles({ x, y, value });

  return (
    <div className={cx(classes.root, className)}>
      {value > 0 && <MuiTypography variant="h5">{value}</MuiTypography>}
    </div>
  );
};

export default Cell;

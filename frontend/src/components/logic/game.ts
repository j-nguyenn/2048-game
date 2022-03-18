import { Grid } from "../Main/types";
import { NUMBER_OF_TILES } from "../utils/constants";

export class Game {
  size: number;
  grid: Grid;
  score: number = 0;
  changed: boolean;

  constructor(numberOfTiles?: number) {
    this.size = numberOfTiles ?? NUMBER_OF_TILES;
  }

  getEmptyCoords(): number[][] {
    const list = [];
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (this.grid[y][x] === 0) list.push([x, y]);
      }
    }
    return list;
  }

  randomSetCell(numOfCells: number = 1, isObstacle?: boolean) {
    const grid = this.grid.map<number[]>((row) =>
      row.map<number>((cell: number) => cell)
    );
    const list = this.getEmptyCoords();
    if (list.length < numOfCells) return this.grid;
    for (let i = 0; i < numOfCells; i++) {
      const index = Math.floor(Math.random() * list.length);
      const [x, y] = list[index];
      const value = isObstacle ? -99 : 2;
      grid[y][x] = value;
      list.splice(index, 1);
    }
    this.grid = grid;
  }

  setGrid(grid: number[][]) {
    this.grid = grid;
  }

  move(type: "up" | "down" | "left" | "right") {
    if (type === "left") {
      this.mergeLeft();
    }
    if (type === "right") {
      this.mergeRight();
    }
    if (type === "down") {
      this.mergeDown();
    }
    if (type === "up") {
      this.mergeUp();
    }
    return { changed: false };
  }
  mergeOneRowL(row: any) {
    for (let j = 0; j < this.size - 1; j++) {
      for (let i = this.size - 1; i > -1; i--) {
        if (row[i] > 0 && row[i - 1] === 0) {
          row[i - 1] = row[i];
          row[i] = 0;
        }
      }
    }
    for (let i = 0; i < this.size - 1; i++) {
      if (row[i] === row[i + 1]) {
        row[i] *= 2;
        row[i + 1] = 0;
      }
    }

    for (let i = this.size - 1; i > -1; i--) {
      if (row[i] > 0 && row[i - 1] === 0) {
        row[i - 1] = row[i];
        row[i] = 0;
      }
    }
    return row;
  }

  mergeLeft() {
    for (let i = 0; i < this.size; i++) {
      this.grid[i] = this.mergeOneRowL(this.grid[i]);
    }
  }

  reverse(row: any) {
    return row.reverse();
  }

  mergeRight() {
    for (let i = 0; i < this.size; i++) {
      this.grid[i] = this.reverse(this.grid[i]);
      this.grid[i] = this.mergeOneRowL(this.grid[i]);
      this.grid[i] = this.reverse(this.grid[i]);
    }
  }

  transpose() {
    for (let j = 0; j < this.size; j++) {
      for (let i = j; i < this.size; i++) {
        if (i !== j) {
          const temp = this.grid[j][i];
          this.grid[j][i] = this.grid[i][j];
          this.grid[i][j] = temp;
        }
      }
    }
  }

  mergeUp() {
    this.transpose();
    this.mergeLeft();
    this.transpose();
  }

  mergeDown() {
    this.transpose();
    this.mergeRight();
    this.transpose();
  }
}

export class Game {
  size: number;
  grid: number[][];

  constructor(numberOfTiles?: number) {
    this.size = numberOfTiles ?? 6;
  }

  generateGrid(): number[][] {
    if (!this.grid) {
      this.grid = new Array(this.size)
        .fill(0)
        .map(() => new Array(this.size).fill(0));
    }
    return this.grid;
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
}

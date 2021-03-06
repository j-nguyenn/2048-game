export interface Cell {
  x: number;
  y: number;
  value: number;
}

export type Grid = number[][];
export interface State {
  initiated: boolean;
  grid: Grid | null;
  score: number;
  bestScore: number;
  changing: boolean;
  step: number;
  isDone: boolean;
}
type Action =
  | {
      type: "init";
      grid: Grid;
      score: number;
      bestScore: number;
      step: number;
      isDone: boolean;
    }
  | {
      type: "set-grid";
      grid: Grid;
    }
  | {
      type: "add-score";
      score: number;
    }
  | {
      type: "set-changing";
      changing: boolean;
    }
  | {
      type: "set-is-done";
      isDone: boolean;
    };

export interface Reducer {
  (state: State, action: Action): State;
}

export interface UseGame {
  (): State & {
    slideTo: (diffX: number, diffY: number) => void;
  };
}

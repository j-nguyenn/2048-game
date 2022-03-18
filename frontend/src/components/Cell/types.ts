export interface Cell {
  x: number;
  y: number;
  value: number;
}
export interface CellProps extends Cell {
  className?: string;
}

export interface StylesProps {
  from: Cell | null;
  to: Cell | null;
  final: Cell;
}

export interface CellNewProps {
  final: Cell;
}

export interface CellMoveProps {
  from: Cell;
  final: Cell;
  hideAfterMove?: boolean;
}

export interface CellMergeProps {
  from: Cell;
  to: Cell;
  final: Cell;
}

interface MouseEventHandler {
  (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}
interface TouchEventHandler {
  (event: React.TouchEvent<HTMLDivElement>): void;
}
export interface BoardProps {
  onMouseDown?: null | MouseEventHandler;
  onMouseUp?: null | MouseEventHandler;
  onMouseLeave?: null | MouseEventHandler;
  onTouchStart?: null | TouchEventHandler;
  onTouchEnd?: null | TouchEventHandler;
}

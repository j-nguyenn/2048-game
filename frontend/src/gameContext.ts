import React from "react";

export interface GameContextProps {
  isInRoom: boolean;
  setInRoom: (inRoom: boolean) => void;
  isPlayerTurn: boolean;
  setPlayerTurn: (turn: boolean) => void;
  isGameStarted: boolean;
  setGameStarted: (started: boolean) => void;
  grid: number[][];
  setGrid: (grid: number[][]) => void;
  roomSettings: { roomName: any; numberOfObstacles: any };
  setRoomSettings: (payload: { roomName: any; numberOfObstacles: any }) => void;
}

const defaultState: GameContextProps = {
  isInRoom: false,
  setInRoom: () => {},
  isPlayerTurn: false,
  setPlayerTurn: () => {},
  isGameStarted: false,
  setGameStarted: () => {},
  grid: [[]],
  setGrid: () => {},
  roomSettings: { roomName: "", numberOfObstacles: 0 },
  setRoomSettings: (payload: { roomName: any; numberOfObstacles: any }) => {},
};

export default React.createContext(defaultState);

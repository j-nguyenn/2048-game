import { useRef, useCallback, useContext, useEffect, useReducer } from "react";
import gameService from "../../services/gameService";
import socketService from "../../services/socketService";
import { State, Reducer, UseGame } from "../Main/types";
import GameContext from "../../gameContext";
import { Game } from "./game";

const ANIMATION_TIMEOUT = 500;

const initialState: State = {
  initiated: false,
  grid: null,
  score: 0,
  bestScore: 0,
  changing: false,
  step: 0,
  isDone: false,
};
const reducer: Reducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "init":
      newState = {
        initiated: true,
        grid: action.grid,
        score: action.score,
        bestScore:
          action.score > state.bestScore ? action.score : state.bestScore,
        changing: false,
        step: action.step,
        isDone: action.isDone,
      };
      break;

    case "set-grid":
      newState.grid = action.grid;
      break;

    case "add-score":
      newState.score = action.score;
      newState.bestScore =
        action.score > state.bestScore ? action.score : state.bestScore;
      break;

    case "set-changing":
      let step = state.step;
      if (action.changing) step++;
      return { ...state, changing: action.changing, step };

    case "set-is-done":
      newState.isDone = action.isDone;
      break;

    default:
      return state;
  }

  return newState;
};

const useGame: UseGame = () => {
  const { isGameStarted, grid, isPlayerTurn, setPlayerTurn } =
    useContext(GameContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const game = useRef<Game>();

  useEffect(() => {
    if (isGameStarted && grid) {
      game.current = new Game(6);
      game.current.setGrid(grid);
      dispatch({
        type: "init",
        grid: game.current.grid,
        score: game.current.score,
        bestScore: undefined,
        step: undefined,
        isDone: false,
      });
    }
  }, [isGameStarted, grid]);

  const handleGameUpdate = (newGrid: number[][]) => {
    if (socketService.socket) {
      gameService.updateGame(socketService.socket, newGrid);
      setPlayerTurn(!isPlayerTurn);
    }
  };

  const afterAnimation = () => {
    setTimeout(() => {
      dispatch({ type: "set-grid", grid: game.current.grid });
      dispatch({ type: "set-changing", changing: false });
    }, ANIMATION_TIMEOUT - game.current.score ?? 0);
  };

  const slideTo = useCallback(
    (diffX: number, diffY: number) => {
      if (state.changing || state.isDone || !isPlayerTurn) return;
      const dir =
        Math.abs(diffX) > Math.abs(diffY)
          ? diffX > 0
            ? "right"
            : "left"
          : diffY > 0
          ? "down"
          : "up";

      game.current.move(dir);
      game.current.randomSetCell();

      dispatch({ type: "set-grid", grid: game.current.grid });
      dispatch({ type: "add-score", score: game.current.score });
      dispatch({ type: "set-changing", changing: true });
      handleGameUpdate(game.current.grid);
      afterAnimation();
    },
    [state.changing, state.grid, state.isDone]
  );
  return { ...state, slideTo };
};

export default useGame;

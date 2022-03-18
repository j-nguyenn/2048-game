import React, { useEffect, useState } from "react";
import socketService from "./services/socketService";
import "./App.css";
import Game from "./components/Main/Main";
import GameContext, { GameContextProps } from "./gameContext";
import gameService from "./services/gameService";
import { JoinGame } from "./components/JoinGame";

function App() {
  const [isInRoom, setInRoom] = useState(false);
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  const [roomSettings, setRoomSettings] = useState({
    roomName: undefined,
    numberOfObstacles: undefined,
  });
  const [grid, setGrid] = useState(undefined);

  const connect = async () => {
    const socket = await socketService
      .connect("http://localhost:9000")
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    joinRoom();
  }, [roomSettings]);

  const gameContextValue: GameContextProps = {
    isInRoom,
    setInRoom,
    roomSettings,
    setRoomSettings,
    isPlayerTurn,
    setPlayerTurn,
    isGameStarted,
    setGameStarted,
    grid,
    setGrid,
  };

  const joinRoom = async () => {
    const socket = socketService.socket;
    if (
      !roomSettings.roomName ||
      roomSettings.roomName.trim() === "" ||
      !socket
    )
      return;

    const joined = await gameService
      .joinGameRoom(
        socket,
        roomSettings.roomName,
        roomSettings.numberOfObstacles
      )
      .catch((err) => {
        alert(err);
      });

    if (joined) setInRoom(true);
  };

  const handleGameStart = () => {
    if (socketService.socket)
      gameService.onStartGame(socketService.socket, (options) => {
        if (options.grid) {
          setGrid(options.grid);
        }
        setGameStarted(true);
        if (options.settings) {
          setRoomSettings(options.settings);
        }

        if (options.start) setPlayerTurn(true);
        else setPlayerTurn(false);
      });
  };

  const handleGameUpdate = () => {
    if (socketService.socket) {
      gameService.onGameUpdate(socketService.socket, (newMatrix) => {
        setGrid(newMatrix);
        setPlayerTurn(!isPlayerTurn);
      });
    }
  };

  useEffect(() => {
    handleGameUpdate();
    handleGameStart();
  }, []);

  return (
    <GameContext.Provider value={gameContextValue}>
      <JoinGame onRoomSettings={setRoomSettings} />
      <Game />
    </GameContext.Provider>
  );
}

export default App;

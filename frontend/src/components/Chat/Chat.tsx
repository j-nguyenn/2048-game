import * as React from "react";
import chatService from "../../services/chatService";
import socketService from "../../services/socketService";
import { createStyles, makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import Input from "@mui/material/Input";

const useStyles = makeStyles(() => {
  return createStyles({
    root: {
      display: "flex",
      justifyContent: "flex-end",
      flexDirection: "column",
      width: "20vw",
      height: "50vw",
      right: 0,
      position: "absolute",
    },
    container: {
      paddingRight: 16,
    },
    right: {
      textAlign: "right",
      '& > span': {
        background: "#2e3192",
        color: '#ffffff'
      },
    },
    text: {
      background: "mistyrose",
      padding: "4px 8px",
      borderRadius: "4px",
    },
  });
});
export default function Chat() {
  const [currentMessage, setCurrentMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const classes = useStyles({});

  const handleSendMessage = () => {
    if (socketService.socket) {
      const newMessage = {
        message: currentMessage,
        userId: socketService.socket.id,
        id: new Date().getTime(),
      };
      chatService.sendMessage(socketService.socket, newMessage);
      setCurrentMessage("");
      setMessages([...messages, newMessage]);
    }
  };

  const handleChatUpdate = () => {
    if (socketService.socket) {
      chatService.onReceiveMessage(socketService.socket, (payload) => {
        setMessages([...messages, payload]);
      });
    }
  };

  handleChatUpdate();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {messages.map(({ id, message, userId }) => (
          <p
            key={id}
            className={socketService.socket.id === userId && classes.right}
          >
            <span className={classes.text}>{message}</span>
          </p>
        ))}
      </div>
      <Input
        value={currentMessage}
        onChange={(e) => {
          setCurrentMessage(e.target.value);
        }}
      ></Input>
      <Button onClick={handleSendMessage}>Submit</Button>
    </div>
  );
}

import { Socket } from "socket.io-client";

class ChatService {
  public async sendMessage(
    socket: Socket,
    payload: { message: string; id: number; userId: string }
  ) {
    socket.emit("send_message", payload);
  }
  public async onReceiveMessage(
    socket: Socket,
    listiner: (payload: any) => void
  ) {
    socket.on("receive_message", (payload) => listiner(payload));
  }
}

export default new ChatService();

import { io } from "socket.io-client";
// establish connection to the server
const socket = io(import.meta.env.SERVER_URL, {
  transports: ["websocket"],
});

export const connectSocket = () => {
  socket.on("connect", () => {
    console.log("Connected to WebSocket Server");
  });
  socket.on("new_message", (message) => {
    console.log("New message recieved", message);
  });
};

export const sendMessage =(message) => {
    socket.emit("send_message", message)
}

export default socket;

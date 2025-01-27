import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

export const connectSocket = () => {
  socket.on("connect", () => {
    console.log("Connected to WebSocket Server");
  });

  socket.on("room_update", (rooms) => {
    console.log("Rooms updated:", rooms);
  });

  socket.on("room_announcement", (message) => {
    console.log(message);
  });
};

export const joinRoom = (room) => {
  socket.emit("join_room", { room });
};

export const sendMessage = (message) => {
  socket.emit("send_message", message);
};
export const disconnectSocket = () => {
    socket.disconnect();
  };
export default socket;
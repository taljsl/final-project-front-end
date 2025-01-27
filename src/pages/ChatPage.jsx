import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL);

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    socket.emit("join", username);

    socket.on("chat-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user-joined", (data) => {
      setMessages((prev) => [...prev, `${data} has joined the chat`]);
    });

    socket.on("user-left", (data) => {
      setMessages((prev) => [...prev, `${data} has left the chat`]);
    });

    return () => {
      socket.emit("leave", username);
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const username = localStorage.getItem("username");
    socket.emit("chat-message", { username, message });
    setMessage("");
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatPage;

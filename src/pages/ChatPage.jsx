import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import './ChatPage.css'; // Import the CSS file

const socket = io(import.meta.env.VITE_SOCKET_URL);

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    socket.emit("join", username);
    // Listen for incoming messages
    socket.on("chat-message", (data) => {
      setMessages((prev) => [...prev, data]);
      // console.log(messages)
    });

    // socket.on("user-joined", (data) => {
    //   setMessages((prev) => [...prev, `${data} has joined the chat`]);
    // });

    // socket.on("user-left", (data) => {
    //   setMessages((prev) => [...prev, `${data} has left the chat`]);
    // });
    
    return () => {
      socket.emit("leave", username);
      // Without this line each message rendrs twice  in our message container
      socket.off("chat-message")
      // socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const username = localStorage.getItem("username");
    const newMessage = { username, message };
    console.log(messages)
    // Emit the message to the server
    socket.emit("chat-message", newMessage);

    // Clear the input field
    setMessage("");
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };
  return (
    <div>
      <h1>Chat Room</h1>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.username}: </strong>{msg.message}
          </p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        onKeyUp={handleKeyPress}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatPage;


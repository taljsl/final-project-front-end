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

    // Add the message to the chat locally (for immediate display)
    // setMessages((prev) => [...prev, newMessage]);

    // Clear the input field
    setMessage("");
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
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatPage;



// mport "./App.css";
// import { useEffect, useState } from "react";
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:4000");

// function App() {
//   const [message, setMessage] = useState("");
//   const [messageReceived, setMessageReceived] = useState("");
//   function sendMessage() {
//     console.log("Button clicked");
//     socket.emit("send_message", { message: message });
//   }
//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessageReceived(data.message);
//     });
//   }, [socket]);

//   return (
//     <div className="App">
//       <input
//         placeholder="Message"
//         onChange={(e) => {
//           setMessage(e.target.value);
//         }}
//       />
//       <button onClick={sendMessage}>Send message</button>
//       <h1>
//         Message: {messageReceived}</h1>
//     </div>
//   );
// }

// export default App;
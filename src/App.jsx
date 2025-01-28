import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;


// import "./App.css";
// import { useEffect, useState } from "react";
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:5001");

// function App() {
//   const [message, setMessage] = useState("");
//   const [messageReceived, setMessageReceived] = useState("");
//   function sendMessage() {
//     console.log("Button clicked");
//     socket.emit("chat_message", { message: message });
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
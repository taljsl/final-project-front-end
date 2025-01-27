import { useState, useEffect } from "react";

import { connectSocket, sendMessage, default as socket } from "../Services/socket";

const ChatPage = ({ token }) => {
  const [currentRoom, setCurrentRoom] = useState("Entryway"); // Default room
  const [rooms, setRooms] = useState({}); // Chatroom list
  const [messages, setMessages] = useState([]); // Messages in the current room
  const [newMessage, setNewMessage] = useState(""); // Input for new message

  // Fetch chatrooms and connect WebSocket when the component mounts
  useEffect(() => {
    if (!token) return;

    // Load chatrooms from the backend
    const loadChatRooms = async () => {
      try {
        const fetchedRooms = await fetchChatRooms(token); // Fetch rooms from the backend
        setRooms(fetchedRooms); // Save rooms to state
      } catch (error) {
        console.error("Failed to load chatrooms:", error);
      }
    };

    loadChatRooms();

    // Connect WebSocket
    connectSocket();

    // Cleanup WebSocket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [token]);

  // Join a chatroom and fetch its history
  const joinRoom = async (roomName) => {
    try {
      // Fetch chatroom history
      const roomHistory = await fetchChatRoomHistory(roomName, token);
      setMessages(roomHistory.messages); // Set messages from the room's history
      setCurrentRoom(roomName); // Set the current room

      // Notify the backend via WebSocket
      socket.emit("join_room", { room: roomName, token });
    } catch (error) {
      console.error(`Failed to join room "${roomName}":`, error);
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // Don't send empty messages

    try {
      // Send message via WebSocket (preferred)
      sendMessage({ room: currentRoom, message: newMessage });

      // Update the UI with the sent message
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "You", content: newMessage },
      ]);

      // Fallback: Persist the message via REST API if necessary
      await sendMessageToChatRoom(currentRoom, newMessage, token);

      // Clear the input field
      setNewMessage("");
    } catch (error) {
      console.error("Error sending the message:", error);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Panel: Chatroom List */}
      <div
        style={{
          flex: 1,
          borderRight: "1px solid #ccc",
          padding: "1rem",
          overflowY: "auto",
        }}
      >
        <h3>Chatrooms</h3>
        {Object.keys(rooms).map((room) => (
          <button
            key={room}
            onClick={() => joinRoom(room)}
            style={{
              display: "block",
              width: "100%",
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: currentRoom === room ? "#007bff" : "#f1f1f1",
              color: currentRoom === room ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px",
              textAlign: "left",
            }}
          >
            {room}
          </button>
        ))}
      </div>

      {/* Right Panel: Chatroom Messages */}
      <div style={{ flex: 3, padding: "1rem", display: "flex", flexDirection: "column" }}>
        <h3>Current Room: {currentRoom}</h3>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          {messages.map((msg, index) => (
            <p key={index} style={{ margin: 0, padding: "5px 0" }}>
              <strong>{msg.sender}:</strong> {msg.content}
            </p>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage(); // Send message on Enter key
            }}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
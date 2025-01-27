import { useState, useEffect } from "react";
import { connectSocket, sendMessage, default as socket } from "../Services/socket";

const ChatPage = ({ token }) => {
  const [currentRoom, setCurrentRoom] = useState("Entryway");
  const [rooms, setRooms] = useState({
    Entryway: { users: [], userCount: 0 },
    "Book Chat": { users: [], userCount: 0 },
    "Tech Chat": { users: [], userCount: 0 },
  });
  const [showUsers, setShowUsers] = useState({});

  useEffect(() => {
    if (!token) return;

    // Connect to socket on page load
    connectSocket();

    // Join the default room
    joinRoom("Entryway");

    // Listen for room updates
    socket.on("room_update", (updatedRooms) => {
      setRooms(updatedRooms);
    });

    // Listen for join/leave announcements
    socket.on("room_announcement", (message) => {
      console.log(message);
    });

    // Cleanup socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, [token]);

  const joinRoom = (room) => {
    socket.emit("join_room", { room, token });
    setCurrentRoom(room);
  };

  const toggleShowUsers = (room) => {
    setShowUsers((prev) => ({
      ...prev,
      [room]: !prev[room],
    }));
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Left Side: Chatroom */}
      <div style={{ flex: 3, padding: "1rem" }}>
        <h2>Chatroom: {currentRoom}</h2>
        <div>
          <label htmlFor="room-select">Switch Room:</label>
          <select
            id="room-select"
            value={currentRoom}
            onChange={(e) => joinRoom(e.target.value)}
          >
            {Object.keys(rooms).map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
        </div>
        <div id="chat-messages">
          {/* Chat messages will go here */}
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage({ room: currentRoom, message: e.target.value });
              e.target.value = "";
            }
          }}
        />
      </div>

      {/* Right Side: Room List */}
      <div
        style={{
          flex: 1,
          borderLeft: "1px solid #ccc",
          padding: "1rem",
          minWidth: "200px",
        }}
      >
        <h3>Rooms</h3>
        {Object.keys(rooms).map((room) => (
          <div key={room}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => toggleShowUsers(room)}
            >
              {room} ({rooms[room].userCount})
            </div>
            {showUsers[room] && (
              <ul>
                {rooms[room].users.map((user, idx) => (
                  <li key={idx}>{user}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
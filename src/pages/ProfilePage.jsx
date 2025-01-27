import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleJoinChat = () => {
    navigate("/chat");
  };

  return (
    <div>
      <h1>Welcome to your Profile</h1>
      <button onClick={handleJoinChat}>Join Chat</button>
    </div>
  );
};

export default ProfilePage;

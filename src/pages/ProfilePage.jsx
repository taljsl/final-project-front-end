import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const ProfilePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Redirecting to login page.");
      navigate("/"); // Redirect to login page if not authenticated
    }
  }, [navigate]);
  const handleJoinChat = () => {
    navigate("/chat");
  };
  const handleLogout = () => {
    // Clear user-related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    alert("You have been logged out.");
    navigate("/"); // Redirect to the home or login page
  };
  return (
    <div>
      <h1>Welcome to your Profile</h1>
      <button onClick={handleJoinChat}>Join Chat</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;

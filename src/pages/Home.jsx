import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);

  return (
    <div>
      {!token && (
        <>
          <h1>Welcome To Josh's Final Project: A Chatroom Application</h1>
          <div>
            <button onClick={() => navigate("/register")}>Register</button>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
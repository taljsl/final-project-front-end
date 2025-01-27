import { useState } from "react";
import { loginUser } from "../Services/ServiceFunctions";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await loginUser(credentials);
      setToken(data.access);
      localStorage.setItem("token", data.access);
      console.log("Logged in Successfully", data);
      navigate("/profile");
    } catch (err) {
      setError("Invalid Username or password");
      console.error("Error during login", err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={credentials.username}
            onChange={(event) =>
              setCredentials({ ...credentials, username: event.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { registerUSER } from "../Services/ServiceFunctions";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    nickname: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const data = await registerUSER(formData);
      if (data) {
        setSuccess(true);
      }
    } catch (err) {
      setError("Registration failed. Please try again.", err);
      
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {success ? <p>Registration successful! You can now log in.</p> : (
        <form onSubmit={handleRegister}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Nickname:</label>
            <input
              type="text"
              value={formData.nickname}
              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Register;
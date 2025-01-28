import { useState } from "react";
import { loginUser } from "../Services/ServiceFunctions";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(formData);
    if (response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("username", response.username); 

      alert("Login successful!");
      window.location.href = "/profile";
    } else {
      alert(response.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
      <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

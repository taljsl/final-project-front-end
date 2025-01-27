import { useState } from "react";
import { registerUser } from "../Services/ServiceFunctions";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", nickname: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerUser(formData);
    if (response.success) {
      alert("Registration successful!");
      window.location.href = "/login";
    } else {
      alert(response.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input type="text" placeholder="Username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
      <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
      <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
      <input type="text" placeholder="Nickname (optional)" onChange={(e) => setFormData({ ...formData, nickname: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

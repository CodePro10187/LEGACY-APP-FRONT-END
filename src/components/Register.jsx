import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:8080/register", form);
      alert("Registration successful");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

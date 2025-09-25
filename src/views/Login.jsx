import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Login = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginMessage, setLoginMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3005/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (res.data.token) {
        setLoginMessage("Login successful!");

        setUser({ email: formData.email, token: res.data.token });
        localStorage.setItem(
          "user",
          JSON.stringify({ email: formData.email, token: res.data.token })
        );
      } else {
        setLoginMessage("Login failed. Please try again.");
      }
    } catch (error) {
      setLoginMessage("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login">
      {user && <Navigate to="/" />}
      <form onSubmit={handleSubmit}>
        {loginMessage && <h2>{loginMessage}</h2>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;

import { useContext, useState } from "react";
import api from "../api";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);

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
      const res = await api.post("http://localhost:3005/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Token from backend:", res.data.token);

      if (res.data.token) {
        const userData = { email: formData.email, token: res.data.token };

        setLoginMessage("Login successful!");

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      } else {
        setLoginMessage("Login failed. Please try again.");
      }
    } catch (error) {
      setLoginMessage("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  if (user) return <Navigate to="/" />;

  return (
    <div className="login">
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

import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import "./SignUp.css";

const SignUp = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signUpMessage, setSignUpMessage] = useState("");

  const [signUpDone, setSignUpDone] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email address";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    try {
      const res = await axios.post("http://localhost:3005/auth/signup", {
        email: formData.email,
        password: formData.password,
      });

      if (res.status === 201) {
        setSignUpMessage("Registration successful! You can now log in.");
        setSignUpDone(true);
      }
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <div className="signup">
      {props.user && <Navigate to="/" />}
      <form onSubmit={handleSubmit}>
        {signUpMessage && <h2>{signUpMessage}</h2>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
        <button type="submit" disabled={signUpDone}>
          {signUpDone ? "Registered" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;

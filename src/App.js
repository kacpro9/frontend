import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ClientList from "./views/ClientList";
import ClientForm from "./views/ClientForm";
import ClientDetails from "./views/ClientDetails";
import SignUp from "./views/SignUp";
import Login from "./views/Login";

import "./App.css";
import axios from "axios";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  axios.defaults.headers.common["Authorization"] =
    "Bearer " + (user ? user.token : "");

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <Router>
      <nav className="navbar">
        <div className="container">
          {user ? (
            <>
              <Link to="/" className="nav-link">
                Clients
              </Link>
              <Link to="/new" className="nav-link">
                Add Client
              </Link>
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ClientList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new"
            element={
              <ProtectedRoute>
                <ClientForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:id/edit"
            element={
              <ProtectedRoute>
                <ClientForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:id"
            element={
              <ProtectedRoute>
                <ClientDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

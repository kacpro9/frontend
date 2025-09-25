import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ClientList from "./views/ClientList";
import ClientForm from "./views/ClientForm";
import ClientDetails from "./views/ClientDetails";
import SignUp from "./views/SignUp";
import Login from "./views/Login";

import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  axios.defaults.headers.common["Authorization"] =
    "Bearer " + (user ? user.token : "");

  return (
    <Router>
      <nav className="navbar">
        <div className="container">
          <Link to="/clients" className="nav-link">
            Clients
          </Link>
          <Link to="/clients/new" className="nav-link">
            Add Client
          </Link>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/new" element={<ClientForm />} />
          <Route path="/clients/:id/edit" element={<ClientForm />} />
          <Route path="/clients/:id" element={<ClientDetails />} />
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

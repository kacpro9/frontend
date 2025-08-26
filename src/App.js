import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ClientList from "./views/ClientList";
import ClientDetails from "./views/ClientDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="container">
          <Link to="/clinets" className="nav-link">
            Clients
          </Link>
          <link to="/clients/new" className="nav-link">
            Add Client
          </link>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/:id" element={<ClientDetails />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

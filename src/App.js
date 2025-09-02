import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ClientList from "./views/ClientList";
import ClientForm from "./views/ClientForm";
import ClientDetails from "./views/ClientDetails";

import "./App.css";

function App() {
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
        </Routes>
      </main>
    </Router>
  );
}

export default App;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ClientList.css";

export default function ClientList() {
  const [clients, setClients] = useState([]);

  const getClients = async () => {
      try {
        const res = await fetch("http://localhost:3005/clients");
        const data = await res.json();
        console.log("API response:", data);
        setClients(data.clients);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

  const handleDelete = async (clientId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this client?"
    );
    if (!confirmed) return;

    try {
      await fetch("http://localhost:3005/clients/" + clientId, {
        method: "DELETE",
      });
      getClients();
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

   useEffect(() => {
    getClients();
  }, []);

  return (
    <div className="client-list-container">
      <h2>Client List</h2>
      <ul className="client-list">
        {clients.map((client) => (
          <li key={client._id} className="client-item">
            <div className="client-info">
              <span>{client.name}</span>
              <span>NIP: {client.nip}</span>
            </div>
            <div className="client-actions">
              <Link to={`/clients/${client._id}`} className="btn">
                View
              </Link>
              <Link to={`/clients/${client._id}/edit`} className="btn btn-edit">
                Edit
              </Link>
              <button
                className="btn btn-delete"
                onClick={() => handleDelete(client._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="add-client">
        <Link to="/clients/new" className="btn btn-add">
          Add New Client
        </Link>
      </div>
    </div>
  );
}

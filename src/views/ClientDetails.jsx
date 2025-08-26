import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ClientDetails() {
  const { id } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch(`http://localhost:3005/clients/${id}`);
        const data = await res.json();
        setClient(data);
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };
    fetchClient();
  }, [id]);

  if (!client) {
    return <div>Client not found!</div>;
  }

  return (
    <div className="client-details-container">
      <h2>Client Details</h2>
      <div className="client-details">
        <p>
          <strong>Name:</strong> {client.name}
        </p>
        <p>
          <strong>NIP:</strong> {client.nip}
        </p>
        {client.adress && (
          <div className="address-block">
            <p>
              <strong>Adress:</strong>
            </p>
            <p>
              {client.adress.street} {client.adress.suite}
            </p>
            <p>
              {client.adress.city}, {client.adress.zipcode}
            </p>
          </div>
        )}
      </div>
      <div className="actions">
        <Link to="/clients" className="btn btn-back">
          Back to Client List
        </Link>
        <Link to={`/clients/edit/${client._id}`} className="btn btn-edit">
          Edit Client
        </Link>
      </div>
    </div>
  );
}

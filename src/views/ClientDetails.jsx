import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import ActionModal from "../components/ActionModal";
import "./ClientDetails.css";
import axios from "axios";

export default function ClientDetails() {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingActionId, setEditingActionId] = useState(null);

  const fetchClient = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:3005/clients/${id}`);
      setClient(res.data.client);
    } catch (error) {
      console.error("Error fetching client details:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchClient();
  }, [fetchClient]);

  const handleActionAdded = () => {
    fetchClient();
  };

  if (!client) {
    return <div>Client not found!</div>;
  }

  return (
    <div className="client-details-container">
      <h1>Client Details</h1>
      <div className="client-details">
        <h2>{client.name}</h2>
        <p>
          <strong>NIP:</strong> {client.nip}
        </p>
        {client.address && (
          <div className="address-block">
            <p>
              <strong>Address:</strong>
            </p>
            <p>
              {client.address.street} {client.address.suite}
            </p>
            <p>
              {client.address.city}, {client.address.zipcode}
            </p>
          </div>
        )}
      </div>
      <div className="actions-list">
        <h3>Associated Actions</h3>
        <div className="actions-list-holder">
          {client.actions?.map((action) => (
            <div key={action._id} className="action-item">
              <div>{new Date(action.date).toLocaleDateString()}</div>
              <div>{action.name}</div>
              <div className="description">{action.description}</div>
              <div className="action-buttons">
                <button
                  className="btn btn-edit"
                  onClick={() => {
                    setEditingActionId(action);
                    setShowModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={async () => {
                    try {
                      const res = await axios.delete(
                        `http://localhost:3005/actions/${action._id}`
                      );
                      console.log("Delete response: ", res);
                      if (res.status !==200) throw new Error("Failed to delete action");
                      fetchClient();
                    } catch (error) {
                      console.error("Error deleting action:", error);
                      alert("Error deleting action. Please try again.");
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="actions">
        <Link to="/clients" className="btn btn-back">
          Back to Client List
        </Link>
        <Link to={`/clients/${client._id}/edit`} className="btn btn-edit">
          Edit Client
        </Link>
        <button
          onClick={() => {
            setEditingActionId(null);
            setShowModal(true);
          }}
          className="btn btn-add-action"
        >
          Add Action
        </button>
      </div>
      {showModal && (
        <ActionModal
          clientId={client._id}
          actionToEdit={editingActionId}
          onClose={() => setShowModal(false)}
          onActionAdded={handleActionAdded}
        />
      )}
    </div>
  );
}

import { useState } from "react";

export default function ActionModal({ clientId, onClose, onActionAdded }) {
  const [action, setAction] = useState({
    type: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3005/clients/${clientId}/actions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(action),
        }
      );
      if (!res.ok) throw new Error("Failed to add action");

      const data = await res.json();
      onActionAdded(data.action);
      setAction({
        type: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
      onClose();
    } catch (error) {
      console.error("Error adding action:", error);
      alert("Error adding action. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Action</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Type:</label>
            <input
              type="text"
              value={action.type}
              onChange={(e) => setAction({ ...action, type: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={action.description}
              onChange={(e) =>
                setAction({ ...action, description: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={action.date}
              onChange={(e) => setAction({ ...action, date: e.target.value })}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn btn-primary">
              Send
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

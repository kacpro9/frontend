import { useEffect, useState } from "react";
import axios from "axios";
import "./ActionModal.css";

export default function ActionModal({
  clientId,
  actionToEdit,
  onClose,
  onActionAdded,
}) {
  const [action, setAction] = useState({
    name: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (actionToEdit) {
      setAction({
        name: actionToEdit.name,
        description: actionToEdit.description,
        date: new Date(actionToEdit.date).toISOString().split("T")[0],
      });
    }
  }, [actionToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = actionToEdit
        ? `http://localhost:3005/actions/${actionToEdit._id}`
        : `http://localhost:3005/actions/${clientId}`;

      const method = actionToEdit ? "put" : "post";

      const res = await axios({
        method,
        url,
        data: action,
      });

      onActionAdded(res.data.action);
      setAction({
        name: "",
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
      <div className="action-modal-container">
        <h2>{actionToEdit ? "Edit Action" : "Add New Action"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label> Action Type:</label>
            <select
              value={action.name}
              onChange={(e) => setAction({ ...action, name: e.target.value })}
              required
            >
              <option value=""> -- Select action type -- </option>
              <option value="Email">Email</option>
              <option value="Call">Call</option>
              <option value="Meeting">Meeting</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Other">Other</option>
            </select>
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
              {actionToEdit ? "Update" : "Send"}
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

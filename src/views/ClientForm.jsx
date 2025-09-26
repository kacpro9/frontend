import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ClientForm.css";

const INIT_FORM_STATE = {
  name: "",
  nip: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
  },
};

export default function ClientForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(INIT_FORM_STATE);

  useEffect(() => {
    if (id) {
      const fetchClient = async () => {
        try {
          const res = await axios.get(`http://localhost:3005/clients/${id}`);
          const data = res.data;
          setFormData(data.client || data);
        } catch (error) {
          console.error("Error fetching client data:", error);
        }
      };
      fetchClient();
    } else {
      setFormData(INIT_FORM_STATE);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: id ? "PUT" : "POST",
        url: id
          ? `http://localhost:3005/clients/${id}`
          : "http://localhost:3005/clients",
        data: formData,
      });

      if (res.status === 200 || res.status === 201) {
        navigate("/clients");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="client-form-container">
      <h2>{id ? "Edit Client" : "Add New Client"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          NIP:
          <input
            type="text"
            name="nip"
            value={formData.nip}
            onChange={handleChange}
            required
          />
        </label>
        <fieldset>
          <legend>Address</legend>
          <label>
            Street:
            <input
              type="text"
              name="address.street"
              value={formData.address?.street}
              onChange={handleChange}
            />
          </label>
          <label>
            Suite:
            <input
              type="text"
              name="address.suite"
              value={formData.address?.suite}
              onChange={handleChange}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="address.city"
              value={formData.address?.city}
              onChange={handleChange}
            />
          </label>
          <label>
            Zipcode:
            <input
              type="text"
              name="address.zipcode"
              value={formData.address?.zipcode}
              onChange={handleChange}
            />
          </label>
        </fieldset>
        <div className="form-actions">
          <button type="submit" className="btn btn-submit">
            {id ? "Update Client" : "Add Client"}
          </button>
          {id && (
            <button
              type="button"
              className="btn btn-cancel"
              onClick={() => navigate("/clients")}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

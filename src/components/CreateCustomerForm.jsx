import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomerForm() {
  const [validated, setValidated] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "" });
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    setValidated(true);

    if (!newCustomer.name.trim() || !newCustomer.email.trim() || !newCustomer.phone.trim()) {
      setError("All fields must be filled out correctly.");
      setSuccess("");
      return;
    }

    if (form.checkValidity() === false) {
      return;
    }

    await createNewCustomer();
  };

  const createNewCustomer = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/customers`, newCustomer);
      setCustomers((prev) => [...prev, response.data]); 
      setNewCustomer({ name: "", email: "", phone: "" }); 
      setSuccess("Customer created successfully!");
      setError("");
      setValidated(false);
    } catch (error) {
      console.error("Error creating customer:", error);
      setError("Error creating customer. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="mx-5">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-4" controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter customer name"
            name="name"
            value={newCustomer.name}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">Provide a valid name</Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter customer email address"
            name="email"
            value={newCustomer.email}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">Provide a valid email</Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="validationCustom03">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            required
            type="tel"
            placeholder="Enter customer phone number"
            name="phone"
            value={newCustomer.phone}
            onChange={handleInputChange}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          />
          <Form.Control.Feedback type="invalid">Provide a valid phone number</Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Create Customer</Button>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
      </Form>
    </div>
  );
}

export default CustomerForm;

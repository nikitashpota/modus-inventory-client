import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import { API_URL } from "../../config";

const SendForm = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${API_URL}/api/insert`, {
      number: inputs.number,
      description: inputs.description,
      owner: inputs.owner,
    });
    e.target.number.value = "";
    e.target.description.value = "";
    e.target.owner.value = "";
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Number</Form.Label>
        <Form.Control
          type="number"
          name="number"
          placeholder="Enter number"
          value={inputs.number || ""}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={inputs.description || ""}
          onChange={handleChange}
          rows={3}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicOwner">
        <Form.Label>Owner</Form.Label>
        <Form.Control
          type="text"
          name="owner"
          placeholder="Enter owner"
          value={inputs.owner || ""}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SendForm;

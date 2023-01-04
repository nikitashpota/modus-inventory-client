import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import { API_URL } from "../../config";

const SendForm = () => {
  const [inputs, setInputs] = useState({category: "Компьютеры и оборудование"});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));

    console.log({ [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${API_URL}/api/insert`, {
      number: inputs.number,
      description: inputs.description,
      owner: inputs.owner,
      category: inputs.category,
    });
    e.target.number.value = "";
    e.target.description.value = "";
    e.target.owner.value = "";

    console.log(inputs.category);
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
      <Form.Group className="mb-3">
        <Form.Label htmlFor="disabledSelect">Categories</Form.Label>
        <Form.Select
          onChange={handleChange}
          name="category"
          id="disabledSelect"
          value={inputs.category || "Компьютеры и оборудование"}
        >
          <option>Компьютеры и оборудование</option>
          <option>Мебель</option>
          <option>Другое</option>
        </Form.Select>
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

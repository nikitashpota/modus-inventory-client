import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { API_URL } from "../../config";

const ModalWindow = ({ show, handleClose, props, setValues }) => {
  const number = props.number;
  const description = props.description;
  const owner = props.owner;
  const id = props.id;
  const category = props.category;
  //const file_src = props.file_src;

  const [inputs, setInputs] = useState({
    number: number,
    description: description,
    owner: owner,
    category: category,
  });

  const [image, setImage] = useState({});

  const handleImage = (e) => {
    const file = e.target.files[0];
    const newFile = new File(
      [file],
      `image-${Date.now()}.${file.name.split(".").pop()}`
    );
    setImage((values) => ({ ...values, file: newFile, name: newFile.name }));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image.file);
    formData.append("owner", inputs.owner);
    formData.append("description", inputs.description);
    formData.append("number", inputs.number);
    formData.append("category", inputs.category);
    formData.append("id", id);

    Axios({
      method: "put",
      url: `${API_URL}/api/update`,
      data: formData,
    }).then((res) => {
      setValues({
        number: inputs.number,
        description: inputs.description,
        owner: inputs.owner,
        id: id,
        category: inputs.category,
        file_src: res.data,
      });
    });


  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit data</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Number</Form.Label>
            <Form.Control
              name="number"
              type="number"
              placeholder="number"
              value={inputs.number || ""}
              onChange={handleChange}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledSelect">Categories</Form.Label>
            <Form.Select
              onChange={handleChange}
              name="category"
              id="disabledSelect"
              value={inputs.category}
            >
              <option>Компьютеры и оборудование</option>
              <option>Мебель</option>
              <option>Другое</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              value={inputs.description || ""}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlText1">
            <Form.Label>Owner</Form.Label>
            <Form.Control
              name="owner"
              type="text"
              placeholder="owner"
              value={inputs.owner || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Upload image</Form.Label>
            <Form.Control
              onChange={handleImage}
              type="file"
              name="image"
              accept="image/png, image/gif, image/jpeg"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalWindow;

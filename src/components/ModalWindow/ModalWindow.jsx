import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { API_URL } from "../../config";

const ModalWindow = ({
  show,
  handleClose,
  props,
  setChangeProps,
  changeRefProps,
}) => {
  const number = props.number;
  const description = props.description;
  const owner = props.owner;
  const id = props.id;
  const category = props.category;
  // const file_src = props.file_src;

  const setChange = setChangeProps;
  const changeRef = changeRefProps;

  const [inputs, setInputs] = useState({
    number: number,
    description: description,
    owner: owner,
    category: category,
  });

  const [image, setImage] = useState({});

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage((values) => ({ ...values, file: file, name: file.name }));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image.file);
    formData.append("owner", inputs.owner);
    formData.append("description", inputs.description);
    formData.append("number", inputs.number);
    formData.append("category", inputs.category);
    formData.append("id", id);

    await Axios.put(`${API_URL}/api/update`, formData).then((res) => {
      setChange(!changeRef.current);
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
              <option>???????????????????? ?? ????????????????????????</option>
              <option>????????????</option>
              <option>????????????</option>
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

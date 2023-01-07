import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import { API_URL } from "../../config";
import AlertMessage from "../AlertMessage/AlertMessage";

const SendForm = () => {
  const [inputs, setInputs] = useState({
    category: "Компьютеры и оборудование",
  });
  const [image, setImage] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));

    console.log({ [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      image.file &&
      inputs.owner &&
      inputs.description &&
      inputs.category &&
      inputs.number
    ) {
      const formData = new FormData();
      formData.append("image", image.file);
      formData.append("owner", inputs.owner);
      formData.append("description", inputs.description);
      formData.append("category", inputs.category);
      formData.append("number", inputs.number);

      Axios.post(`${API_URL}/api/insert`, formData);

      e.target.number.value = "";
      e.target.description.value = "";
      e.target.owner.value = "";
      e.target.image.value = "";
    } else {
      setShowAlert(true);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const newFile = new File(
      [file],
      `image-${Date.now()}.${file.name.split(".").pop()}`
    );
    setImage((values) => ({ ...values, file: newFile, name: newFile.name }));
  };

  return (
    <>
      <AlertMessage
        show={showAlert}
        setShow={setShowAlert}
        messagesTitle={"Форма не заполнена."}
        messagesText={"Пожалуйста, заполните все поля формы."}
      />
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
        <Form.Group className="mb-3">
          <Form.Label>Upload image</Form.Label>
          <Form.Control
            onChange={handleImage}
            type="file"
            name="image"
            accept="image/png, image/gif, image/jpeg"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SendForm;

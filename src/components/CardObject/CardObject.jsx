import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import ModalWindow from "../ModalWindow/ModalWindow";
import { API_URL, CLIENT_URL } from "../../config";

const CardObject = ({ props, setChangeProps, changeRefProps }) => {

  const setChange = setChangeProps;
  const changeRef = changeRefProps;

  const [values, setValues] = useState({
    number: props.number,
    description: props.description,
    owner: props.owner,
    id: props.id,
    category: props.category,
    file_src: props.file_src,
  });

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const deleteObject = () => {
    Axios.delete(`${API_URL}/api/delete/${values.id}`).then(() => {
      setChange(!changeRef.current);
    });
  };

  return (
    <>
      <Card style={{ width: "20rem" }}>
        <Card.Body>
          <Card.Img
            style={{ height: "200px", objectFit: "cover" }}
            className="mb-3"
            variant="top"
            src={values.file_src}
          />
          <Card.Text>{values.number}</Card.Text>
          <Card.Title>Category:</Card.Title>
          <Card.Text>{values.category}</Card.Text>
          <Card.Title>Description:</Card.Title>
          <Card.Text>{values.description}</Card.Text>
          <Card.Title>Owner:</Card.Title>
          <Card.Text>{values.owner}</Card.Text>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <Button onClick={deleteObject} style={{ width: "100px" }}>
              Delete
            </Button>
            <Button onClick={handleShow} style={{ width: "100px" }}>
              Edit
            </Button>
          </div>
          <Card.Link href={`${CLIENT_URL}/print/${values.id}`}>Go to link</Card.Link>
        </Card.Body>
      </Card>
      <ModalWindow
        show={show}
        handleClose={handleClose}
        props={props}
        setValues = {setValues}
      />
    </>
  );
};

export default CardObject;

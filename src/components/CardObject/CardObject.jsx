import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import ModalWindow from "../ModalWindow/ModalWindow";
import { API_URL, CLIENT_URL } from "../../config";

const CardObject = ({ props, setChangeProps, changeRefProps }) => {
  const setChange = setChangeProps;
  const changeRef = changeRefProps;

  const number = props.number;
  const description = props.description;
  const owner = props.owner;
  const id = props.id;
  const category = props.category;
  const file_src = props.file_src;

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const deleteObject = () => {
    Axios.delete(`${API_URL}/api/delete/${id}`).then(() => {
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
            src={file_src}
          />
          <Card.Text>{number}</Card.Text>
          <Card.Title>Category:</Card.Title>
          <Card.Text>{category}</Card.Text>
          <Card.Title>Description:</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Title>Owner:</Card.Title>
          <Card.Text>{owner}</Card.Text>
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
          <Card.Link href={`${CLIENT_URL}/print/${id}`}>
            Go to link
          </Card.Link>
        </Card.Body>
      </Card>
      <ModalWindow
        show={show}
        handleClose={handleClose}
        props={props}
        setChangeProps={setChange}
        changeRefProps={changeRef}
      />
    </>
  );
};

export default CardObject;

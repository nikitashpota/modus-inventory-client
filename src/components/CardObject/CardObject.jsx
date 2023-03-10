import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import ModalWindow from "../ModalWindow/ModalWindow";


import { CLIENT_URL } from "../../config";

import "./style.css";
import DeleteWarning from "../DeleteWarning/DeleteWarning";

const CardObject = ({ props, setChangeProps, changeRefProps }) => {
  const setChange = setChangeProps;
  const changeRef = changeRefProps;

  const number = props.number;
  const description = props.description;
  const owner = props.owner;
  const id = props.id;
  const category = props.category;
  // const file_src = props.file_src;

  const [show, setShow] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleShowWarning = () => setShowWarning(true);

  return (
    <>
    <DeleteWarning setShow ={setShowWarning}
    id = {id}
    changeRef = {changeRef}
    setChange = {setChange}
    show = {showWarning}/>
      <Card className="cardM">
        <Card.Body>
          {/* <Card.Img
            style={{ height: "100px",width: "100px", objectFit: "cover" }}
            className="mb-3"
            variant="top"
            src={file_src}
            loading="lazy"
          /> */}
          <Card.Link href={`${CLIENT_URL}/print/${id}`}>
            <Card.Title className="mb-3">{number}</Card.Title>
          </Card.Link>
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
            }}
          >
            <Button
              variant="danger"
              onClick={handleShowWarning}
              style={{ width: "100px" }}
            >
              Delete
            </Button>
            <Button
              variant="primary"
              onClick={handleShow}
              style={{ width: "100px" }}
            >
              Edit
            </Button>
          </div>
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

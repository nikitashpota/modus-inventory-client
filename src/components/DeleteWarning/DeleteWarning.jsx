import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";
import { API_URL } from "../../config";
import "./style.css";

const DeleteWarning = ({ setShow, id, setChange, changeRef, show }) => {
  const handleClose = () => setShow(false);

  const deleteObject = () => {
    Axios.delete(`${API_URL}/api/delete/${id}`).then(() => {
      setChange(!changeRef.current);
    });

    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete ID-{id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove the element?</Modal.Body>
        <Modal.Footer>
          <Button className="warning__button" variant="danger" onClick={deleteObject}>
            Yes
          </Button>
          <Button className="warning__button" variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteWarning;

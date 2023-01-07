import React from "react";
import Alert from "react-bootstrap/Alert";

const AlertMessage = ({ show, setShow, messagesTitle, messagesText }) => {
  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{messagesTitle}</Alert.Heading>
        <p>{messagesText}</p>
      </Alert>
    );
  }
};

export default AlertMessage;

import React from "react";
import Card from "react-bootstrap/Card";
import QRCode from "react-qr-code";
import { URL } from "../../config";

const CardPrint = ({ props }) => {
  const number = props.number;
  const id = props.id;
  const link = `${URL}/print/${id}`;

  return (
    <Card>
      <Card.Body>
        <QRCode value={link} size={126} style={{ marginBottom: "1rem" }} />
        <Card.Title style={{ textAlign: "center" }}>{number}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default CardPrint;

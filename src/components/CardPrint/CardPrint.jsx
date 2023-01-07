import React from "react";
import Card from "react-bootstrap/Card";
import QRCode from "react-qr-code";
import { CLIENT_URL } from "../../config";

const CardPrint = ({ props }) => {
  const number = props.number;
  const id = props.id;
  const link = `${CLIENT_URL}/print/${id}`;

  return (
    <Card>
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <QRCode value={link} size={126} style={{ marginBottom: "1rem" }} />

        <Card.Link href={`${CLIENT_URL}/print/${id}`}>
          <Card.Title style={{ textAlign: "center" }}>{number}</Card.Title>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default CardPrint;

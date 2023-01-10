import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import QRCode from "react-qr-code";
import { saveSvgAsPng } from "save-svg-as-png";
import { CLIENT_URL } from "../../config";

const CardPrint = ({ props }) => {
  const number = props.number;
  const id = props.id;
  const link = `${CLIENT_URL}/print/${id}`;

  const handlePrint = () => {
    const svg = document.querySelector("svg");
    saveSvgAsPng(svg, `QR_${props.number}-${props.category}.png`, { scale: 1 });
  };

  return (
    <div>
      <Card>
        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card.Link
            style={{ marginBottom: "1rem" }}
            href={`${CLIENT_URL}/print/${id}`}
          >
            <Card.Title style={{ textAlign: "center" }}>{number}</Card.Title>
          </Card.Link>
          <QRCode
            name="svg"
            value={link}
            size={126}
            style={{ marginBottom: "1rem" }}
          />
          <Button style={{ width: "100%" }} onClick={handlePrint}>
            Print
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardPrint;

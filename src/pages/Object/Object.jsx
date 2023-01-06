import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import Image from "react-bootstrap/Image";
import { API_URL, CLIENT_URL } from "../../config";

const Object = () => {
  const { id } = useParams();
  const [object, setObject] = useState([]);
  const link = `${CLIENT_URL}/print/${object.id}`;

  useEffect(() => {
    Axios.get(`${API_URL}/api/get`).then((response) => {
      setObject(response.data.find((x) => x.id === +id));
    });
  }, [id]);

  if (object) {
    return (
      <div
        style={{
          display: "flex",
          paddingLeft: "12px",
          paddingRight: "12px",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <div style={{ display: "flex", position: "relative", marginBottom: "1rem" }}>
          <QRCode
            value={link}
            size={32}
            style={{ position: "absolute", bottom: "0" }}
          />
          <Image
            style={{
              width: "100%",
              height: "400px",
              objectFit: "contain",
              backgroundColor: "black",
            }}
            src={object.file_src}
            alt="img"
          />
        </div>
        <h4>ID</h4>
        <p>{object.id}</p>
        <h4>Number:</h4>
        <p>{object.number}</p>
        <h4>Category:</h4>
        <p>{object.category}</p>
        <h4>Description:</h4>
        <p>{object.description}</p>
        <h4>Owner:</h4>
        <p>{object.owner}</p>
      </div>
    );
  } else {
    return <p>Элемент отсутствует в каталоге</p>;
  }
};

export default Object;

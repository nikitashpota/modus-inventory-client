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
          paddingEight: "12px",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <QRCode value={link} size={128} className="mb-3" />
        <Image
          style={{
            height: "400px",
            objectFit: "scale-down",
            backgroundColor: "black",
          }}
          src={object.file_src}
          alt="img"
        />
        <h3>ID</h3>
        <p>{object.id}</p>
        <h3>Number:</h3>
        <p>{object.number}</p>
        <h3>Category:</h3>
        <p>{object.category}</p>
        <h3>Description:</h3>
        <p>{object.description}</p>
        <h3>Owner:</h3>
        <p>{object.owner}</p>
      </div>
    );
  } else {
    return <p>Элемент отсутствует в каталоге</p>;
  }
};

export default Object;

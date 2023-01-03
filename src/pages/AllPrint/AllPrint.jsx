import React, { useState, useEffect } from "react";
import Axios from "axios";
import CardPrint from "../../components/CardPrint/CardPrint";
import { API_URL } from "../../config";

const AllPrint = () => {
  const [descriptionList, setDescriptionList] = useState([]);

  useEffect(() => {
    Axios.get(`${API_URL}/api/get`).then((response) => {
      setDescriptionList(response.data);
    });
  }, [descriptionList]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {descriptionList.map((value) => {
        return <CardPrint props={value} key={value.id}/>;
      })}
    </div>
  );
};

export default AllPrint;

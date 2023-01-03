import React, { useState, useEffect } from "react";
import Axios from "axios";
import CardObject from "../../components/CardObject/CardObject";
import { API_URL } from "../../config";

const AllObjects = () => {
  const [descriptionList, setDescriptionList] = useState([]);

  useEffect(() => {
    Axios.get(`${API_URL}/api/get`).then((response) => {
      setDescriptionList(response.data);
    });
  }, [descriptionList]);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {descriptionList.map((value) => {
          return <CardObject props={value} key={value.id} />;
        })}
      </div>
    </>
  );
};

export default AllObjects;

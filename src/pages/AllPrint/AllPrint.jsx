import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import CardPrint from "../../components/CardPrint/CardPrint";
import { API_URL } from "../../config";
import EmptyList from "../../components/EmptyList/EmptyList";

const AllPrint = () => {
  const [objects, setObjects] = useState([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    console.log("Effect");
    setInterval(() => {
      Axios.get(`${API_URL}/api/get`).then((response) => {
        setObjects(response.data);
      });
    }, 1000);

    return function cleanup() {
      mountedRef.current = false;
    };
  }, [mountedRef]);

  if (objects.length > 0) {
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
        {objects.map((value) => {
          return <CardPrint props={value} key={value.id} />;
        })}
      </div>
    );
  } else {
    return (
      <>
        <EmptyList />
      </>
    );
  }
};

export default AllPrint;

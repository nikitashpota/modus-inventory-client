import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./style.css";
import Form from "react-bootstrap/Form";
import CardObject from "../../components/CardObject/CardObject";
import { API_URL } from "../../config";
import EmptyList from "../../components/EmptyList/EmptyList";

const AllObjects = () => {
  const [descriptionList, setDescriptionList] = useState([]);
  const [selectFilter, setSelectFilter] = useState("Всё...");

  const handleChangeFilter = (e) => {
    const value = e.target.value;
    setSelectFilter(value);

    console.log(value);
  };

  useEffect(() => {
    Axios.get(`${API_URL}/api/get`).then((response) => {
      setDescriptionList(response.data);
    });
  }, [descriptionList]);

  const resultAfterFilter = descriptionList
    .filter((value) => value.category === selectFilter)
    .map((value) => {
      return <CardObject props={value} key={value.id} />;
    });

  const resultWithoutFilter = descriptionList.map((value) => {
    return <CardObject props={value} key={value.id} />;
  });

  const result =
    selectFilter !== "Всё..." ? resultAfterFilter : resultWithoutFilter;

  if (descriptionList.length > 0) {
    return (
      <>
        <div style={{ paddingLeft: "12px", paddingRight: "12px" }}>
          <Form>
            <Form.Group>
              <Form.Label>Categories:</Form.Label>
              <Form.Select className="mb-3" onChange={handleChangeFilter}>
                <option>Всё...</option>
                <option>Компьютеры и оборудование</option>
                <option>Мебель</option>
                <option>Другое</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {result}
        </div>
      </>
    );
  } else {
    return (
      <>
        <EmptyList />
      </>
    );
  }
};

export default AllObjects;

import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import "./style.css";
import Form from "react-bootstrap/Form";
import CardObject from "../../components/CardObject/CardObject";
import { API_URL } from "../../config";
import EmptyList from "../../components/EmptyList/EmptyList";

const AllObjects = () => {
  const [objects, setObjects] = useState([{ id: 0 }]);
  const [selectFilter, setSelectFilter] = useState("Всё...");
  const changeRef = useRef(true);

  const handleChangeFilter = (e) => {
    const value = e.target.value;
    setSelectFilter(value);
  };

  const [change, setChange] = useState(false);

  useEffect(() => {
    console.log("effect");
    Axios.get(`${API_URL}/api/get`).then((response) => {
      setObjects(response.data);
    });
    changeRef.current = change;
  }, [change]);

  const filterDescriptionList =
    selectFilter === "Всё..."
      ? objects
      : objects.filter((value) => {
          return value.category === selectFilter;
        });

  if (objects.length > 0) {
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
          {filterDescriptionList.map((value) => {
            return (
              <CardObject
                props={value}
                key={value.id}
                setChangeProps={setChange}
                changeRefProps={changeRef}
              />
            );
          })}
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

import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import "./style.css";
import CardObject from "../../components/CardObject/CardObject";
import { API_URL } from "../../config";
import EmptyList from "../../components/EmptyList/EmptyList";

const AllObjects = () => {
  const [objects, setObjects] = useState([{ id: 0 }]);
  const [filterCategory, setFilterCategories] = useState("Все категории");
  const [owners, setOwners] = useState(["Все владельцы"]);
  const [filterOwner, setFilterOwner] = useState("Все владельцы");
  const changeRef = useRef(true);

  const handleFilterCategoty = (e) => {
    const value = e.target.value;
    setFilterCategories(value);
  };

  const handleFilterOwner = (e) => {
    const value = e.target.value;
    setFilterOwner(value);
  };

  const [change, setChange] = useState(false);

  useEffect(() => {
    Axios.get(`${API_URL}/api/get`).then((response) => {
      setObjects(response.data);

      const owns = new Set(response.data.map((value) => value.owner));
      owns.forEach((owner) => {
        if (!owners.includes(owner)) {
          setOwners((prev) => [...prev, owner]);
        }
      });
    });
    changeRef.current = change;
    // eslint-disable-next-line
  }, [change]);

  let filterObjects =
    filterCategory === "Все категории"
      ? objects
      : objects.filter((value) => {
          return value.category === filterCategory;
        });

  filterObjects =
    filterOwner === "Все владельцы"
      ? filterObjects
      : filterObjects.filter((value) => {
          return value.owner === filterOwner;
        });

  const all = (
    <div className="cards">
      {filterObjects.map((value) => {
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
  );

  const empty = (
    <>
      <EmptyList />
    </>
  );

  return (
    <>
      <div className="filters">
        <h1 className="filters__name">FILTERS</h1>
        <select className="filters__input" onChange={handleFilterCategoty}>
          <option>Все категории</option>
          <option>Компьютеры и оборудование</option>
          <option>Мебель</option>
          <option>Другое</option>
        </select>

        <select className="filters__input" onChange={handleFilterOwner}>
          {owners.map((owner) => {
            return <option key={owner}>{owner}</option>;
          })}
        </select>
      </div>
      {filterObjects.length > 0 ? all : empty}
    </>
  );
};

export default AllObjects;

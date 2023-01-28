import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Object from "./pages/Object/Object";

import AllObjects from "./pages/AllObjects/AllObjects";
import DataEntry from "./pages/DataEntry/DataEntry";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AllPrint from "./pages/AllPrint/AllPrint";

function App() {
  return (
    <div className="wrapper">
      <Navbar
        bg="dark"
        variant="dark"
        style={{ marginBottom: "1rem" }}
        className="header"
      >
        <Container>
          <Navbar.Brand href="/">MODUS</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Objects</Nav.Link>
            <Nav.Link href="/add">Add object</Nav.Link>
            <Nav.Link href="/print">Print QR</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="main">
        <Router>
          <Routes>
            <Route exact path="/" element={<AllObjects />} />
            <Route path="/add" element={<DataEntry />} />
            <Route path="/print" element={<AllPrint />} />
            <Route path="/print/:id" element={<Object />} />
          </Routes>
        </Router>
      </div>
      <footer className="bg-light text-center text-lg-start footer">
        <div className="text-center p-3" style={{}}>
          ООО "Модус" © 2023
        </div>
      </footer>
    </div>
  );
}

export default App;

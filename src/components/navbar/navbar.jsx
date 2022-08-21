import React from "react";
import { Link } from "react-router-dom";

// Import React Bootstrap components
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

// Import Custom CSS
import "./navbar.scss";

export function NavbarView() {
  const user = localStorage.getItem("user");

  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  return (
    <Navbar variant="light" expand="md">
      <Nav
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Navbar>
          <Nav.Item>
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/Login">Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/My Profile">My Profile</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/Registraion">Registration</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/Logout">Logout</Nav.Link>
          </Nav.Item>
        </Navbar>
      </Nav>
    </Navbar>
  );
}

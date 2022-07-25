import React from "react";

import { Container, Navbar, Nav, Button } from "react-bootstrap";

import "./navbar.scss";

export function Menu({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Container>
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
            <Nav.Link eventKey="My Profile">My Profile</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/Registraion">Registration</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Logout">Logout</Nav.Link>
          </Nav.Item>
        </Navbar>
      </Nav>
    </Container>
  );
}

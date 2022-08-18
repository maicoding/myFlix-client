import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Container,
  Col,
  Row,
  Card,
  CardGroup,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import "./login-view.scss";
import axios from "axios";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be 2 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 6) {
      setPassword("Password must be at least 6 characters long");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    const isReq = validate();
    // Send a request to the server for authentication, then call props.onLoggedIn(username)

    if (isReq) {
      axios
        .post("https://maicoding-movieapi.herokuapp.com/login", {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log("no such user");
        });
    }
  };

  return (
    <Container fluid="true">
      <Card>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter a user name"
              />
              {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Your password has to be at least 8 characters long"
                minLength="8"
              />
              {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>
            <br />
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
          <p>
            Need an account? <Link to={"/register"}>Sign up</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}
LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};

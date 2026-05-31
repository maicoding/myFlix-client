import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";

// user registration function
export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [values, setValues] = useState({
    usernameErr: "",
    passwordErr: "",
    emailErr: "",
    birthdayErr: "",
  });

  const validate = () => {
    let isReq = true;
    const nextValues = {
      usernameErr: "",
      passwordErr: "",
      emailErr: "",
      birthdayErr: "",
    };

    if (!username) {
      nextValues.usernameErr = "Username required";
      isReq = false;
    } else if (username.length < 5) {
      nextValues.usernameErr = "Username must be at least 5 characters long";
      isReq = false;
    }
    if (!password) {
      nextValues.passwordErr = "Password required";
      isReq = false;
    } else if (password.length < 8) {
      nextValues.passwordErr = "Password must be 8 characters long";
      isReq = false;
    }
    if (!birthday) {
      nextValues.birthdayErr = "Birthday required";
      isReq = false;
    }
    if (!email) {
      nextValues.emailErr = "Email is required";
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      nextValues.emailErr = "Invalid email";
      isReq = false;
    }
    setValues(nextValues);
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://maicoding-movieapi.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          alert("Registration sucessful, please login");
          window.open("/", "_self");
        })
        .catch((response) => {
          console.error(response);
          alert("Unable to register");
        });
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Registration</Card.Title>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter a user name"
              />
              {values.usernameErr && <p>{values.usernameErr}</p>}
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
              {values.passwordErr && <p>{values.passwordErr}</p>}
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>email:</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Your email"
              />
              {values.emailErr && <p>{values.emailErr}</p>}
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>birthday:</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setBirthday(e.target.value)}
                required
                placeholder="Your birthday"
              />
              {values.birthdayErr && <p>{values.birthdayErr}</p>}
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
RegistrationView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func,
  onRegister: PropTypes.func,
};

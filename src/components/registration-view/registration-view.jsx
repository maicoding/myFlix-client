import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Col,
  Row,
  Card,
  CardGroup,
  Nav,
  NavBar,
} from "react-bootstrap";

// user registration function
export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister(false);
  };

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">AppforMovies</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <CardGroup>
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
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>email:</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Your email"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}
RegistrationView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};

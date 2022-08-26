import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Import React Bootstrap Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";

// Import custom SCSS
import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: "",
      Password: "",
      Email: "",
      Birthday: "",
      FavouriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser = (token) => {
    const Username = localStorage.getItem("user");
    axios
      .get(`https://maicoding-movieapi.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async (response) => {
        console.log(response);
        const data = await response.data;
        console.log("From user api", data);

        this.setState(() => {
          return {
            Username: data.Username,
            Password: data.Password,
            Email: data.Email,
            Birthday: data.Birthday,
            FavouriteMovies: [...data.FavouriteMovies],
          };
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onRemoveFavourite = (movie) => {
    const username = localStorage.getItem("user");
    console.log(username);
    const token = localStorage.getItem("token");
    console.log(this.props);
    axios
      .delete(
        `https://maicoding-movieapi.herokuapp.com/users/${username}/movies/${movie._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert("Movie was removed from favourites.");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .put(
        `https://maicoding-movieapi.herokuapp.com/users/${Username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });

        localStorage.setItem("user", this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert("Profile is updated!");
        window.open(`/users/${Username}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Deregister
  onDeleteUser() {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://maicoding-movieapi.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Profile has been deleted!");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open(`/`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Set user values
  setUsername(value) {
    this.setState({
      Username: value,
    });
    this.Username = value;
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
    this.Password = value;
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
    this.Email = value;
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
    this.Birthday = value;
  }

  render() {
    const { movies } = this.props;
    const { FavouriteMovies, movie, Username, Email, Birthday, Password } =
      this.state;

    console.log("state", this.state);

    const favMovies = movies.filter((m) => FavouriteMovies.includes(m._id));
    console.log("FavouriteMovies", favMovies);
    return (
      <Container fluid="true">
        <Row>
          <Col>
            <Card className="user-profile">
              <Card.Header>User Profile</Card.Header>
              <Card.Body>
                <>
                  <p>Name: {Username}</p>
                  <p>Email: {Email}</p>
                  <p>Birthday: {Birthday}</p>
                </>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="update-inputs">
              <Card.Header>Update Profile</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form
                    className="update-form"
                    onSubmit={(e) =>
                      this.editUser(
                        e,
                        this.Username,
                        this.Password,
                        this.Email,
                        this.Birthday
                      )
                    }
                  >
                    <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="Username"
                        placeholder="New Username"
                        onChange={(e) => this.setUsername(e.target.value)}
                        required
                        autoComplete="off"
                        value={Username}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="Password"
                        placeholder="New Password"
                        onChange={(e) => this.setPassword(e.target.value)}
                        required
                        autoComplete="off"
                        value={Password}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="Email"
                        placeholder="New Email"
                        onChange={(e) => this.setEmail(e.target.value)}
                        required
                        value={Email}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Birthday</Form.Label>
                      <Form.Control
                        type="date"
                        name="Birthday"
                        onChange={(e) => this.setBirthday(e.target.value)}
                        value={Birthday}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Button
                        variant="warning"
                        type="submit"
                        onClick={() => this.editUser()}
                      >
                        Update User
                      </Button>
                      <Button
                        className="delete-button"
                        variant="danger"
                        onClick={() => this.onDeleteUser()}
                      >
                        Delete User
                      </Button>
                    </Form.Group>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row></Row>
        <Card className="favmov-inputs">
          {favMovies.length > 1 ? (
            <Card.Body>
              <Row>
                <Col xs={12}>
                  <h4>Favourite Movies</h4>
                </Col>
              </Row>
              <Row>
                {favMovies.map((fm) => {
                  return (
                    <Col key={fm._id} className="fav-movie">
                      <Figure>
                        <Link to={`/movies/${fm._id}`}>
                          <Figure.Image src={fm.ImagePath} alt={fm.Title} />
                          <Figure.Caption>{fm.Title}</Figure.Caption>
                        </Link>
                      </Figure>
                      <Button
                        className="remove"
                        variant="secondary"
                        onClick={() => this.onRemoveFavourite(fm)}
                      >
                        Remove from the list
                      </Button>
                    </Col>
                  );
                })}
              </Row>
            </Card.Body>
          ) : (
            <Card.Body>
              {" "}
              <Row>
                <Col xs={12}>
                  <h4>No Favourite Movies</h4>
                </Col>
              </Row>
            </Card.Body>
          )}
        </Card>
      </Container>
    );
  }
}

import React from "react";
import axios from "axios";
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
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Container } from "react-bootstrap";

export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
    };
  }

  componentDidMount() {
    console.log("Component did mount is called");
    axios
      .get("https://maicoding-movieapi.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    //alert("You clicked on " + newSelectedMovie.Title);
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

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
        <div className="main-view">
          {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
          {selectedMovie ? (
            <Row className="justify-content-md-center">
              <Col md={8}>
                <MovieView
                  movie={selectedMovie}
                  onBackClick={(newSelectedMovie) => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            </Row>
          ) : (
            movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            ))
          )}
        </div>
      </Container>
    );
  }
}

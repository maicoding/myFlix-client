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
import { DirectorView } from "../director-view/director-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";

import { ProfileView } from "../profile-view/profile-view";
import { GenreView } from "../genre-view/genre-view";
import { NavbarView } from "../navbar/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      Description: null,
      Movies: null,
      user: null,
    };
  }
  // Load movies from database
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({ user: localStorage.getItem("user") });
      this.getMovies(accessToken);
    }
  }
  // Get movies
  getMovies(token) {
    axios
      .get("https://maicoding-movieapi.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // To log in
  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username,
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }
  // To log out
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }
  // Load movies from database
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({ user: localStorage.getItem("user") });
      this.getMovies(accessToken);
    }
  }
  // Set user
  setUser(user) {
    this.setState({ user });
    localStorage.setItem("user", JSON.stringify(user));
  }
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  loadingCheck(user) {
    if (!user)
      return (
        <Col>
          <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
        </Col>
      );
    if (movies.length === 0) return <div className="main-view" />;
  }
  render() {
    const { movies, user } = this.state;
    return (
      <Container>
        <Row>
          {" "}
          <Col>
            <Router>
              <Row className="main-view justify-content-md-center">
                <Route
                  exact
                  path="/"
                  render={() => {
                    if (!user)
                      return (
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      );
                    if (movies.length === 0)
                      return <div className="main-view" />;
                    return movies.map((m) => (
                      <Col sm={10} md={6} lg={4} key={m._id}>
                        <MovieCard movie={m} />
                      </Col>
                    ));
                  }}
                />

                <Route
                  path="/register"
                  render={() => {
                    if (user) return <Redirect to="/" />;
                    return (
                      <Col>
                        <RegistrationView />
                      </Col>
                    );
                  }}
                />
                <Route
                  path="/movies/:movieId"
                  render={({ match, history }) => {
                    if (!user)
                      return (
                        <Col>
                          <LoginView
                            onLoggedIn={(user) => this.onLoggedIn(user)}
                          />
                        </Col>
                      );
                    if (movies.length === 0)
                      return <div className="main-view" />;
                    return (
                      <Col md={8}>
                        <MovieView
                          movie={movies.find(
                            (m) => m._id === match.params.movieId
                          )}
                          onBackClick={() => history.goBack()}
                        />
                      </Col>
                    );
                  }}
                />
                <Route
                  path="/directors/:Name"
                  render={({ match, history }) => {
                    if (!user)
                      return (
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      );
                    if (movies.length === 0)
                      return <div className="main-view" />;
                    return (
                      <Col md={8}>
                        <DirectorView
                          Director={
                            movies.find(
                              (m) => m.director.Name === match.params.Name
                            ).Director
                          }
                          movies={movies}
                          onBackClick={() => history.goBack()}
                        />
                      </Col>
                    );
                  }}
                />

                <Route
                  path="/genres/:Name"
                  render={({ match, history }) => {
                    if (!user)
                      return (
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      );
                    if (movies.length === 0)
                      return <div className="main-view" />;
                    return (
                      <Col md={8}>
                        <GenreView
                          movies={movies}
                          Genre={
                            movies.find(
                              (m) => m.Genre.Name === match.params.Name
                            ).Genre
                          }
                          onBackClick={() => history.goBack()}
                        />
                      </Col>
                    );
                  }}
                />

                <Route
                  exact
                  path="/users/:Username"
                  render={({ history }) => {
                    if (!user)
                      return (
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      );
                    if (movies.length === 0)
                      return <div className="main-view" />;
                    return (
                      <Col md={8}>
                        <ProfileView
                          user={user}
                          setUser={(user) => this.setUser(user)}
                          movies={movies}
                          onLoggedOut={() => this.onLoggedOut()}
                          onBackClick={() => history.goBack()}
                        />
                      </Col>
                    );
                  }}
                />
              </Row>
            </Router>
          </Col>
        </Row>
      </Container>
    );
  }
}

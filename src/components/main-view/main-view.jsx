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
import { Menu } from "../navbar/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Container } from "react-bootstrap";

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

    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }

    // axios
    //   .get("https://maicoding-movieapi.herokuapp.com/movies")
    //   .then((response) => {
    //     this.setState({
    //       movies: response.data,
    //     });
    //     console.log(response);
    //     console.log(this.state);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  setSelectedMovie(newSelectedMovie) {
    //alert("You clicked on " + newSelectedMovie.Title);
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  // onLoggedIn(user) {
  //   this.setState({
  //     user,
  //   });
  // }

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

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    return (
      <>
        <Router>
          <Menu user={user} />
          {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
          <Row className="justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Row>
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    </Row>
                  );
                return movies.map((m) => (
                  <Col md={3} key={m._id}>
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
                  <Col lg={8} md={8}>
                    <RegistrationView />
                  </Col>
                );
              }}
            />

            <Route
              path={`/users/${user}`}
              render={({ history }) => {
                if (!user) return <Redirect to="/" />;
                return (
                  <Col>
                    <ProfileView
                      user={user}
                      onBackClick={() => history.goBack()}
                      movies={movies}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <DirectorView
                      director={movies.find((m) => {
                        return m.directors.Name === match.params.name;
                      })}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <GenreView
                      director={movies.find((m) => {
                        return m.genres.Name === match.params.name;
                      })}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Router>
      </>
    );
  }
}

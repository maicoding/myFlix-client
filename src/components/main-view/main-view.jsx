import React from "react";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { DirectorView } from "../directors-view/directors-view";
import { GenreView } from "../genre-view/genre-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view";
import { RegistrationView } from "../registration-view/registration-view";

import "./main-view.scss";
export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      username: null,
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        username: localStorage.getItem("username"),
      });
      this.getMovies(accessToken);
    }
  }
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
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn = (authData) => {
    const { Username, Email, Birthday, FavouriteMovies } = authData.user;
    this.setState({ Username, FavouriteMovies: FavouriteMovies || [] });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("username", Username);
    localStorage.setItem("email", Email);
    localStorage.setItem("birthday", Birthday);
    this.getMovies(authData.token);
  };

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  render() {
    const { movies, user } = this.state;

    if (!user)
      return (
        <Row>
          <Col>
            <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
          </Col>
        </Row>
      );
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Container fluid>
          <Route
            exact
            path="/"
            render={() => {
              // If there's no user, the LoginView is rendered.
              if (!Username) {
                return <LoginView onLoggedIn={this.onLoggedIn} />;
              }
              // If a user is logged the Movies are rendered as MovieCards
              return (
                <Row className="main-view-width mx-auto justify-content-center mt-3">
                  {movies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie}>
                      {movies.title}
                    </MovieCard>
                  ))}
                </Row>
              );
            }}
          />

          <Route
            path="/register"
            render={() => {
              if (Username) return <Redirect to="/" />;
              return <RegistrationView />;
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => (
              <MovieView
                movie={movies.find((m) => m._id === match.params.movieId)}
                isFavourite={FavouriteMovies.includes(match.params.movieId)}
                goBack={history.goBack}
                handleFavourite={this.handleFavourite}
              />
            )}
          />

          <Route
            path="/directors/:directorName"
            render={({ match, history }) => (
              <DirectorView
                director={
                  movies.find(
                    (m) => m.directors.Name === match.params.directorName
                  ).director
                }
                directorMovies={movies.filter(
                  (m) => m.directors.Name === match.params.directorName
                )}
                goBack={history.goBack}
              />
            )}
          />

          <Route
            path="/genres/:genreName"
            render={({ match, history }) => (
              <GenreView
                genreMovies={movies.filter(
                  (movie) => movies.genres.Name === match.params.genreName
                )}
                genre={
                  movies.find(
                    (movie) => movies.genre.name === match.params.genreName
                  ).genre
                }
                goBack={history.goBack}
              />
            )}
          />

          <Route
            path={`/users/${Username}`}
            render={({ history }) => {
              if (!username) return <Redirect to="/" />;
              return (
                <ProfileView
                  movies={movies}
                  goBack={history.goBack}
                  FavouriteMovies={favouriteMovies || []}
                  handleFavourite={this.handleFavorite}
                />
              );
            }}
          />
        </Container>
      </Router>
    );
  }
}

import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import {
  Container,
  Col,
  Row,
  Card,
  CardGroup,
  Nav,
  Navbar,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  addFavoriteMovie(e) {
    const { movie } = this.props;
    e.preventDefault();
    axios
      .post(
        `https://ap-myflix.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}/Movies/${movie._id}`,
        { username: localStorage.getItem("user") },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        alert(`${movie.title} successfully added to your favorites`);
      })
      // .then(res => {
      //   window.open(`/users/${localStorage.getItem('user')}`)
      // })
      .then((res) => {
        document.location.reload(true);
      })
      .catch((error) => {
        alert(`${movie.title} not added to your favorites` + error);
      });
  }

  render() {
    const { movie, director, onBackClick } = this.props;
    const { directors, genres } = movie;
    const { Name } = directors;

    console.log(movie);
    return (
      <Card>
        <Card.Body>
          <Card.Title>Movie View</Card.Title>
          <div className="movie-view">
            <div className="movie-poster">
              <img className="d-block w-100" src={movie.ImagePath} />
            </div>
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.title}</span>
            </div>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
            <div className="movie-genre">
              <span className="label">Genre: </span>
              <span className="value">{movie.genres.Name}</span>
            </div>
            <div className="movie-genre">
              <span className="label">Description: </span>
              <span className="value">{movie.genres.Description}</span>
            </div>
            <div className="movie-director">
              <span className="label">Director: </span>
              <span className="value">{movie.directors.Name}</span>
            </div>
            <div className="movie-director">
              <span className="label">Bio: </span>
              <span className="value">{movie.directors.Bio}</span>
            </div>
            <div className="movie-director">
              <span className="label">Birth: </span>
              <span className="value">{movie.directors.Birth}</span>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </button>
            <Button variant="link">
              <Link to={`/directors/${movie.directors.Name}`}>Director</Link>
            </Button>

            <Link to={`/genres/${movie.genres.Name}`}>
              <Button variant="link">Genre</Button>
            </Link>
          </div>
          <Card.Footer>
            {` `}
            <Button
              variant="outline-primary"
              className="btn-outline-primary"
              value={movie._id}
              onClick={(e) => this.addFavoriteMovie(e, movie)}
            >
              Add to Favorites
            </Button>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    genres: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    directors: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }),
  }).isRequired,
};

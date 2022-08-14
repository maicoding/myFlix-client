import React from "react";
import PropTypes from "prop-types";
import { Menu } from "../navbar/navbar.jsx";
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
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;
    const {directors, genres} = movie
    const{Name} = directors
   
  
    console.log(movie);
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title>Movie View</Card.Title>
                  <div className="movie-view">
                    <div className="movie-poster">
                      <img src={movie.ImagePath} />
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
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
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
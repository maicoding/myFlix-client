import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card style={{ width: "14rem" }}>
        <Card.Img
          style={{ width: "14rem", height: "18rem" }}
          fluid
          variant="top"
          src={movie.ImagePath}
        />
        <Card.Body>
          <Card.Title className="title-style">{movie.Title}</Card.Title>
          <Card.Text>{movie.genres.Name}</Card.Text>

          <Link to={`/movies/${movie._id}`}>
            <Button className="button-style" variant="primary">
              Open
            </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
MovieCard.propTypes = {
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
  }),
};

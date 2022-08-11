import React from "react";
import PropTypes from "prop-types";

import { Button, Col, Container, Row } from "react-bootstrap";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { movies, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col className="label">Genre: </Col>
          <Col className="value">{movies.genres.Name}</Col>
        </Row>
        <Row className="mt-3">
          <Col className="label">Description: </Col>
          <Col className="value">{movies.genres.Description}</Col>
        </Row>
        <Button
          className="d-block mt-3"
          onClick={() => {
            onBackClick(null);
          }}
          variant="primary"
        >
          Back
        </Button>
      </Container>
    );
  }
}

GenreView.propTypes = {
  genres: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};

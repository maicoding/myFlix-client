import React from "react";
import PropTypes from "prop-types";

// Import React Bootstrap Components
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

// Import custom SCSS
import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { Genre, onBackClick } = this.props;

    return (
      <Container>
        <Card>
          <Card.Header></Card.Header>
          <Card.Body>
            <Card.Title>{movies.genres.Name}</Card.Title>
            <Card.Text>{movies.genres.Description}</Card.Text>
            <Card.Footer>
              <Button
                onClick={() => {
                  onBackClick(null);
                }}
              >
                Back
              </Button>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

GenreView.proptypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};

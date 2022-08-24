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
    const { genre, onBackClick } = this.props;

    return (
      <Container>
        <Card className="genre-card">
          <Card.Body>
            <Card.Title className="genre-card-title">
              <h3>{genre.Name}</h3>
            </Card.Title>
            <Card.Text className="genre-card-text">
              <h5>Description:</h5> {genre.Description}
            </Card.Text>
            <Card.Footer className="genre-card-footer">
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
  genres: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }),
  onBackClick: PropTypes.func.isRequired,
};

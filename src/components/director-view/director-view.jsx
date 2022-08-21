import React from "react";
import PropTypes from "prop-types";

// Import React Bootstrap Components
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

// Import custom SCSS
import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { directors, onBackClick } = this.props;

    return (
      <Container>
        <Card className="director-card">
          <Card.Body>
            <Card.Title className="director-card-title">
              {directors.Name}
            </Card.Title>
            <Card.Text className="director-card-text">
              Born: {directors.Birth}
            </Card.Text>
            <Card.Text className="director-card-text">
              {directors.Bio}
            </Card.Text>
            <Card.Footer className="director-card-footer">
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

DirectorView.proptypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.number.isRequired,
  }),
  onBackClick: PropTypes.func.isRequired,
};

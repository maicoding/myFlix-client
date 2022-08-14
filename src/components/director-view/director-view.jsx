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

export class DirectorView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  render() {
    const { director, onBackClick } = this.props;
    const { directors, title } = director;
    const { Bio, Birth, Name } = directors;

    console.log(director);
    return (
      <Container>
        <Card className="dir-view">
          <Card.Header className="dir-view-header">Director</Card.Header>
          <Card.Body className="dir-view-title">{Name}</Card.Body>
          <Card.Body>Born: {Birth}</Card.Body>
          <Card.Body>{Bio}</Card.Body>
          <Card.Footer>
            <Button
              className="dir-view-button"
              onClick={() => {
                onBackClick();
              }}
            >
              Back
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}

DirectorView.propTypes = {
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

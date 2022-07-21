import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  Col,
  Row,
  Card,
  CardGroup,
  Nav,
  Navbar,
  Button,
} from "react-bootstrap";

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Nav
          activeKey="/home"
          onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
          <Navbar>
            <Nav.Item>
              <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="/Login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="My Profile">My Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Registration">Registration</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Logout">Logout</Nav.Link>
            </Nav.Item>
          </Navbar>
        </Nav>
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
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Back
                    </Button>
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

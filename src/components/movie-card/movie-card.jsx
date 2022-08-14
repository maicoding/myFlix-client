import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card style={{ width: "14rem", height: "auto", marginBottom: "2rem" }}>
        <Card.Img
          style={{ width: "14rem", height: "18rem" }}
          variant="top"
          src={movie.ImagePath}
        />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

// export class MovieCard extends React.Component {
//   render() {
//     const { movie, onMovieClick } = this.props;

//     return (
//       <Row className="main-view justify-content-md-center">
//         <Col md={8}>
//           <Card style={{ width: "14rem" }}>
//             <Card.Img
//               style={{ width: "14rem", height: "18rem" }}
//               fluid
//               variant="top"
//               src={movie.ImagePath}
//             />
//             <Card.Body>
//               <Card.Title>{movie.title}</Card.Title>
//               <Card.Text>{movie.genres.Name}</Card.Text>
//               <Button onClick={() => onMovieClick(movie)} variant="link">
//                 Open
//               </Button>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     );
//   }
// }
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
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

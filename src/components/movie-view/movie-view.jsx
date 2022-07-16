import React from 'react';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">title: </span>
          <span className="value">{movie.title}</span>
        </div>
        <div className="movie-description">
          <span className="label">description: </span>
          <span className="value">{movie.description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">genre: </span>
          <span className="value">{movie.genre}</span>
        </div>
        <div className="movie-director">
          <span className="label">director: </span>
          <span className="value">{movie.director}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>

      </div>
    );
  }
}
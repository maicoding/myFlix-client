import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component 
{
    render() {
        const { movie, onMovieClick } = this.props;

        return (
            <div onClick={() => onMovieClick(movie)} className='movie-card'>{movie.Title}</div>
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
            Description: PropTypes.string.isRequired
        }),
        directors: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string
        })
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
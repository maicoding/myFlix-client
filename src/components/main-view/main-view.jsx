import React from 'react';
//import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export default class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
        movies: [ //Might need to change name to movie from movies, to fit the schema from achievement 2
            { _id: 1, Title: 'Inception', 
            Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.', 
            Genre:"Action", 
            Director:"Christopher Nolan", 
            ImagePath: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg" },
            { _id: 2, Title: 'The Shawshank Redemption', 
            Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 
            Genre:"Drama", 
            Director:"Frank Darabont",  
            ImagePath: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX67_CR0,0,67,98_AL_.jpg"},
            { _id: 3, Title: 'Gladiator', 
            Description: 'Commodus takes over power and demotes Maximus, one of the preferred generals of his father, Emperor Marcus Aurelius. As a result, Maximus is relegated to fighting till death as a gladiator.', 
            Genre:'Action', 
            Director:"Ridley Scott", 
            ImagePath: "https://m.media-amazon.com/images/I/41-bEj5-O4L._SX38_SY50_CR,0,0,38,50_.jpg"},
        ],
        selectedMovie: null
    };
 }

    /*componentDidMount() {
        console.log("Component did mount is called")
        axios.get('https://maicoding-movieapi.herokuapp.com/movies')
        .then(response => { 
            console.log(response.data);
            this.setState({movies: response.data});
        })
        .catch(error => { console.log(error) });
    }*/

  setSelectedMovie(newSelectedMovie) {
    //alert("You clicked on " + newSelectedMovie.Title);
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

render() {
    const { movies, selectedMovie } = this.state;


    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }

}
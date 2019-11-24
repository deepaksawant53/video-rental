import React, { Component } from 'react';
import { getMovies } from './../services/fakeMovieService';
import MoviesFilter from './movieTable';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import Filter from './common/filter';
import { getGenres } from './../services/fakeGenreService';
import MoviesTable from './movieTable';

class movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: {}
  }

  componentDidMount() {
    const defaultGenre = { _id: 0, name: 'All Genres' }
    this.setState({ movies: getMovies(), genres: [{ ...defaultGenre }, ...getGenres()], selectedGenre: defaultGenre });
  }

  handleDeleteMovie = movieId => {
    this.setState({ movies: this.state.movies.filter(movie => movie._id !== movieId) });
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  }

  handleFilter = genre => {
    const filteredMovies = genre.name === 'All Genres' ? getMovies() : getMovies().filter(movie => movie.genre._id === genre._id);
    this.setState({ selectedGenre: genre, movies: filteredMovies, currentPage: 1 });
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies, genres, selectedGenre } = this.state;
    if (count === 0) return <p>There are no movies in the database</p>
    const movies = paginate(allMovies, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-md-3">
          <Filter elementList={genres} selectedElement={selectedGenre} onElementSelected={this.handleFilter} />
        </div>
        <div className="col">
          <span>Showing {count} movies in the database</span>
          <MoviesTable movies={allMovies} onLike={this.handleLike} onDelete={this.handleDeleteMovie} />
          <Pagination itemsCount={count} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }
}
export default movies;

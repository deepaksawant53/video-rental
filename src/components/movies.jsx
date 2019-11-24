import React, { Component } from 'react';
import { getMovies } from './../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import Filter from './common/filter';
import { getGenres } from './../services/fakeGenreService';
import MoviesTable from './movieTable';
import _ from 'lodash';

class movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: {},
    sortColumn: { propertyName: 'title', order: 'asc' }
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

  handleSort = propertyName => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.propertyName === propertyName) {
      sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
    } else {
      sortColumn.propertyName = propertyName;
      sortColumn.order = 'asc';
    }
    this.setState({ sortColumn });
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies, genres, selectedGenre, sortColumn } = this.state;
    if (count === 0) return <p>There are no movies in the database</p>
    const sortedMovies = _.orderBy(allMovies, [sortColumn.propertyName], [sortColumn.order]);
    const movies = paginate(sortedMovies, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-md-3">
          <Filter elementList={genres} selectedElement={selectedGenre} onElementSelected={this.handleFilter} />
        </div>
        <div className="col">
          <span>Showing {count} movies in the database</span>
          <MoviesTable movies={movies} onLike={this.handleLike} onDelete={this.handleDeleteMovie} onSort={this.handleSort} />
          <Pagination itemsCount={count} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }
}
export default movies;

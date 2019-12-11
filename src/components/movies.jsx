import React, { Component } from 'react';
import { getMovies } from './../services/fakeMovieService';
import { getGenres } from './../services/fakeGenreService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import Filter from './common/filter';
import MoviesTable from './movieTable';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class Movies extends Component {
  searchText = React.createRef();
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: {},
    sortColumn: { propertyName: 'title', order: 'asc' }
  };

  componentDidMount() {
    const defaultGenre = { _id: 0, name: 'All Genres' }
    this.setState({ movies: getMovies(), genres: [{ ...defaultGenre }, ...getGenres()], selectedGenre: defaultGenre });
  };

  handleDeleteMovie = movieId => {
    this.setState({ movies: this.state.movies.filter(movie => movie._id !== movieId) });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleFilter = genre => {
    this.searchText.current.value = '';
    const filteredMovies = genre.name === 'All Genres' ? getMovies() : getMovies().filter(movie => movie.genre._id === genre._id);
    this.setState({ selectedGenre: genre, movies: filteredMovies, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, movies: allMovies, sortColumn } = this.state;
    const sortedMovies = _.orderBy(allMovies, [sortColumn.propertyName], [sortColumn.order]);
    const movies = paginate(sortedMovies, currentPage, pageSize);

    return movies;
  };

  handleMovieSearch = ({ currentTarget: searchBox }) => {
    if (searchBox.value) {
      const allMovies = [...getMovies()];
      const filteredMoviesBySearch = allMovies.filter(movie => movie.title.toLowerCase().indexOf(searchBox.value.toLowerCase()) >= 0);
      this.setState({ movies: filteredMoviesBySearch, selectedGenre: {}, currentPage: 1 });
    } else {
      this.setState({ movies: getMovies(), selectedGenre: { _id: 0, name: 'All Genres' }, currentPage: 1 });
    }
  };

  handleNewMovieEvent = () => {
    this.props.history.push("/movies/new");
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, genres, selectedGenre } = this.state;

    if (count === 0) return <p>There are no movies in the database</p>

    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <Filter elementList={genres} selectedElement={selectedGenre} onElementSelected={this.handleFilter} />
          </div>
          <div className="col">
            <div className="row">
              <Link
                to="/movie/new"
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
              >
                New Movie
              </Link>
            </div>
            <div className="row">
              <span>Showing {count} movies in the database</span>
              <input ref={this.searchText} type="text" className="form-control" id="movieSearch" placeholder="Search..." onChange={this.handleMovieSearch} style={{ marginBottom: 10, marginTop: 15 }}></input>
              <MoviesTable movies={this.getPagedData()} sortColumn={sortColumn} onLike={this.handleLike} onDelete={this.handleDeleteMovie} onSort={this.handleSort} />
              <Pagination itemsCount={count} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
            </div>
          </div>
        </div>
      </div>
    );
  };
}
export default Movies;

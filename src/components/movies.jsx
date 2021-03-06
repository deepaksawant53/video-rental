import React, { Component } from 'react';
import movieService from '../services/movieService';
import getGenres from './../services/genreService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import Filter from './common/filter';
import MoviesTable from './movieTable';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import SearchBox from './common/searchBox';
import { toast } from 'react-toastify';

class Movies extends Component {
  searchText = React.createRef();
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: {},
    searchText: "",
    sortColumn: { propertyName: 'title', order: 'asc' }
  };

  async componentDidMount() {
    const defaultGenre = { _id: 0, name: 'All Genres' }
    this.setState({ movies: await movieService.getMovies(), genres: [{ ...defaultGenre }, ...await getGenres()], selectedGenre: defaultGenre });
  };

  handleDeleteMovie = async movieId => {
    let allMovies = this.state.movies;
    const originalMovies = [...allMovies];
    const updatedMovieList = allMovies.filter(currentMovie => movieId != currentMovie._id);

    this.setState({ movies: updatedMovieList });
    try {
      await movieService.deleteMovie(movieId);
    } catch (error) {
      if (error.response && error.response.status == 404) {
        toast.error("This movie has already been deleted.");
      }
      this.setState({ movies: originalMovies });
    }
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

  handleFilter = async genre => {
    const movies = await movieService.getMovies();
    const filteredMovies = genre.name === 'All Genres' ? movies : movies.filter(movie => movie.genre._id === genre._id);
    this.setState({ selectedGenre: genre, movies: filteredMovies, searchText: "", currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      sortColumn,
      searchText
    } = this.state;
    let filtered = allMovies;
    if (searchText) {
      filtered = allMovies.filter(movie => movie.title.toLowerCase().indexOf(searchText.toLowerCase()) >= 0);
    }
    const sortedMovies = _.orderBy(filtered, [sortColumn.propertyName], [sortColumn.order]);
    const movies = paginate(sortedMovies, currentPage, pageSize);

    return movies;
  };

  handleMovieSearch = searchText => {
    if (searchText) {
      this.setState({ searchText: searchText, selectedGenre: {}, currentPage: 1 });
    } else {
      this.setState({ searchText: "", selectedGenre: { _id: 0, name: 'All Genres' }, currentPage: 1 });
    }
  };

  handleNewMovieEvent = () => {
    this.props.history.push("/movies/new");
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, genres, selectedGenre, searchText } = this.state;
    const {user} = this.props;

    if (count === 0) return <p>There are no movies in the database</p>

    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <Filter elementList={genres} selectedElement={selectedGenre} onElementSelected={this.handleFilter} />
          </div>
          <div className="col">
            <div className="row">
              {user && (<Link
                to="/movie/new"
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
              >
                New Movie
              </Link>)}
            </div>
            <div className="row">
              <span>Showing {count} movies in the database</span>
              <SearchBox name="movieSearch" value={searchText} onChange={this.handleMovieSearch} />
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

import React, { Component } from 'react';
import { getMovies } from './../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import Filter from './common/filter';
import { getGenres } from './../services/fakeGenreService';

class movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedElement: 0
  }

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: [{ _id: 0, name: 'All Genres' }, ...getGenres()] });
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
    this.setState({ selectedElement: genre._id, movies: filteredMovies, currentPage: 1 });
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies, genres, selectedElement } = this.state;
    if (count === 0) return <p>There are no movies in the database</p>
    const movies = paginate(allMovies, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-md-3">
          <Filter elementList={genres} selectedElement={selectedElement} onClick={this.handleFilter} />
        </div>
        <div className="col">
          <span>Showing {count} movies in the database</span>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                movies.map(movie =>
                  <tr key={movie._id}>
                    <th scope="row">{movie.title}</th>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)} /></td>
                    <td><button onClick={() => this.handleDeleteMovie(movie._id)} className="btn btn-danger btn-sm">Delete</button></td>
                  </tr>
                )
              }
            </tbody>
          </table>
          <Pagination itemsCount={count} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }
}
export default movies;

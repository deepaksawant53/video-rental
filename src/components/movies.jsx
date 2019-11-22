import React, { Component } from 'react';
import { getMovies } from './../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';

class movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1
  }

  // constructor() {
  //   super();
  // }

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
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;
    if (count === 0) return <p>There are no movies in the database</p>

    const movies = paginate(allMovies, currentPage, pageSize);
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}
export default movies;

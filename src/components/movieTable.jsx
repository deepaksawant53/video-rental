import React, { Component } from 'react';
import Like from './common/like';

class MoviesTable extends Component {
  raiseSort = propertyName => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.propertyName === propertyName) {
      sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
    } else {
      sortColumn.propertyName = propertyName;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn);
  }
  render() {
    const { movies, onLike, onDelete } = this.props;
    return (

      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort('title')} scope="col">Title</th>
            <th onClick={() => this.raiseSort('genre.name')} scope="col">Genre</th>
            <th onClick={() => this.raiseSort('numberInStock')} scope="col">Stock</th>
            <th onClick={() => this.raiseSort('dailyRentalRate')} scope="col">Rate</th>
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
                <td><Like liked={movie.liked} onClick={() => onLike(movie)} /></td>
                <td><button onClick={() => onDelete(movie._id)} className="btn btn-danger btn-sm">Delete</button></td>
              </tr>
            )
          }
        </tbody>
      </table>
    );
  }
}
export default MoviesTable;
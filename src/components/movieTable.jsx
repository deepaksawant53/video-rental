import React, { Component } from 'react';
import Like from './common/like';
import TableHeader from './common/tableHeader';

class MoviesTable extends Component {
  // We are initializing this column property here because throughout the life of this component
  // the value of this property is never going to be changed.
  columns = [
    { key: 'title', propertyName: 'title', label: 'Title' },
    { key: 'genre', propertyName: 'genre.name', label: 'Genre' },
    { key: 'numberInStock', propertyName: 'numberInStock', label: 'Stock' },
    { key: 'dailyRentalRate', propertyName: 'dailyRentalRate', label: 'Rate' },
    { key: 'like' },
    { key: 'delete' }
  ];

  render() {
    const { movies, sortColumn, onLike, onDelete, onSort } = this.props;
    return (

      <table className="table">
        <TableHeader columns={this.columns} sortColumn={sortColumn} onSort={onSort} />
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
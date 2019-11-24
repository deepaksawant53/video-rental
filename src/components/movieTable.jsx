import React, { Component } from 'react';
import Like from './common/like';
import Table from './common/table';

class MoviesTable extends Component {
  // We are initializing this column property here because throughout the life of this component
  // the value of this property is never going to be changed.
  columns = [
    { key: 'title', propertyName: 'title', label: 'Title' },
    { key: 'genre', propertyName: 'genre.name', label: 'Genre' },
    { key: 'numberInStock', propertyName: 'numberInStock', label: 'Stock' },
    { key: 'dailyRentalRate', propertyName: 'dailyRentalRate', label: 'Rate' },
    { key: 'like', jsxContent: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} /> },
    { key: 'delete', jsxContent: movie => <button onClick={() => this.props.onDelete(movie._id)} className="btn btn-danger btn-sm">Delete</button> }
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table data={movies} columns={this.columns} sortColumn={sortColumn} keyPropertyForBody={{ name: '_id' }} onSort={onSort} />
    );
  }
}
export default MoviesTable;
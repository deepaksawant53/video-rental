import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './common/like';
import Table from './common/table';
import authService from '../services/authService';

class MoviesTable extends Component {
  state = {
    columns: [
      { key: 'title', propertyName: 'title', label: 'Title', jsxContent: movie => <Link to={`/movie/${movie._id}`}>{movie.title}</Link> },
      { key: 'genre', propertyName: 'genre.name', label: 'Genre' },
      { key: 'numberInStock', propertyName: 'numberInStock', label: 'Stock' },
      { key: 'dailyRentalRate', propertyName: 'dailyRentalRate', label: 'Rate' },
      { key: 'like', jsxContent: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} /> },
      { key: 'delete', jsxContent: movie => <button onClick={() => this.props.onDelete(movie._id)} className="btn btn-danger btn-sm">Delete</button> }
    ]
  };

  componentDidMount() {
    const user = authService.getCurrentUser();
    const columns = [
      { key: 'title', propertyName: 'title', label: 'Title', jsxContent: movie => <Link to={`/movie/${movie._id}`}>{movie.title}</Link> },
      { key: 'genre', propertyName: 'genre.name', label: 'Genre' },
      { key: 'numberInStock', propertyName: 'numberInStock', label: 'Stock' },
      { key: 'dailyRentalRate', propertyName: 'dailyRentalRate', label: 'Rate' },
      { key: 'like', jsxContent: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} /> },
      { key: 'delete', jsxContent: user && user.isAdmin ? movie => <button onClick={() => this.props.onDelete(movie._id)} className="btn btn-danger btn-sm">Delete</button> : "" }
    ]
    this.setState({columns});
  };

  // We are initializing this column property here because throughout the life of this component
  // the value of this property is never going to be changed.

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table data={movies} columns={this.state.columns} sortColumn={sortColumn} keyPropertyForBody={{ name: '_id' }} onSort={onSort} />
    );
  }
}
export default MoviesTable;
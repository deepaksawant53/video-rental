import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from './../services/fakeGenreService';
import { saveMovie } from './../services/fakeMovieService';
import movieService from './../services/movieService';

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", rate: "" },
    genreList: [],
    errors: {}
  };

  async componentDidMount() {
    this.setState({ genreList: [...getGenres()] });
    if (this.props.match.params.id !== "new") {
      const movie = await movieService.getMovie(this.props.match.params.id);
      if (!movie) return this.props.history.replace("/not-found");
      this.setState({ data: { title: movie.title, genreId: movie.genre._id, numberInStock: movie.numberInStock, rate: movie.dailyRentalRate } });
      this.validate();
    }
  }

  schema = {
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().integer().min(0).max(100).label('Number in stock'),
    rate: Joi.number().precision(2).min(0).max(10).label('Rate')
  }

  doSubmit = ({ title, genreId, numberInStock, rate: dailyRentalRate }) => {
    saveMovie({ title, genreId, numberInStock, dailyRentalRate });
    this.props.history.replace("/movies");
  };

  render() {
    const { genreList, errors, data } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Movie Form</h1>
        <div>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", genreList, "_id", "name", "_id")}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("rate", "Rate", "number")}
          {this.renderButton("Save")}
        </div>
      </form>
    );
  };
}
export default MovieForm;
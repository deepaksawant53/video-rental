import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import getGenres from './../services/genreService';
import movieService from './../services/movieService';
import { toast } from 'react-toastify';

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", rate: "" },
    genreList: [],
    errors: {}
  };

  populateGenres = async () => {
    this.setState({ genreList: [...await getGenres()] });
  }

  populateMovie = () => {
    if (this.props.match.params.id !== "new") {
      try {
        const movie = await movieService.getMovie(this.props.match.params.id);
        this.setState({ data: { title: movie.title, genreId: movie.genre._id, numberInStock: movie.numberInStock, rate: movie.dailyRentalRate } });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.props.history.replace("/not-found");
        }
      }
      this.validate();
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  schema = {
    title: Joi.string().required().min(5).label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().integer().min(0).max(100).label('Number in stock'),
    rate: Joi.number().precision(2).min(0).max(10).label('Rate')
  }

  doSubmit = async ({ title, genreId, numberInStock, rate: dailyRentalRate }) => {
    const id = this.props.match.params.id;
    if (this.props.match.params.id !== "new") {
      try {
        await movieService.updateMovie(id, { title, genreId, numberInStock, dailyRentalRate });
      } catch (error) {
        toast.error("Unable to update movie details.");
      }
    } else {
      try {
        await movieService.addMovie({ title, genreId, numberInStock, dailyRentalRate });
      } catch (error) {
        toast.error("Unable to add movie details.");
      }
    }
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
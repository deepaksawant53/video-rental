import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from './../services/fakeGenreService';

class MovieForm extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", rate: "" },
    genreList: [],
    errors: {}
  };

  componentDidMount() {
    this.setState({ genreList: [...getGenres()] });
  }

  schema = {
    title: Joi.string().required().label('Title'),
    genre: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().integer().min(0).max(100).label('Number in stock'),
    rate: Joi.number().integer().min(0).max(10).label('Rate')
  }

  doSubmit = () => {
    console.log("Movie Form Submitted!!!");
  };

  render() {
    const { genreList, errors, data } = this.state;
    return (
      <form action={this.handle}>
        <h1>Movie Form</h1>
        <div>
          {this.renderInput("title", "Title")}
          <label htmlFor="genre">Genre</label>
          <div className="form-group">
            <select className="custom-select" defaultValue={data["genre"]}>
              {!data["genre"] && <option></option>}
              {genreList.map(genre =>
                <option
                  key={genre["_id"]}
                  value={genre["name"]}
                >
                  {genre["name"]}
                </option>
              )}
            </select>
            {errors['genre'] && <div className="alert alert-danger">{errors['genre']}</div>}
          </div>
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("rate", "Rate", "number")}
        </div>
      </form>
    );
  };
}
export default MovieForm;
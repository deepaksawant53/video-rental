import http from './common/httpService';
import config from '../config.json';

const apiEndpoint = config.apiUrl + 'movies';

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

const getMovie = async movieId => {
  const { data: movie } = await http.get(movieUrl(movieId));
  return movie;
}

const getMovies = async () => {
  const { data: movies } = await http.get(apiEndpoint);
  return movies;
};

const deleteMovie = async movieId => {
  try {
    await http.delete(movieUrl(movieId))
  } catch (error) {
    throw error;
  }
};

const addMovie = async movie => {
  try {
    await http.post(apiEndpoint, movie);
  } catch (error) {
    throw error;
  }
};

const updateMovie = async (id, movie) => {
  try {
    await http.put(movieUrl(id), movie);
  } catch (error) {
    throw error;
  }
};

export default {
  getMovie,
  getMovies,
  deleteMovie,
  addMovie,
  updateMovie
};
import http from './common/httpService';
import { toast } from 'react-toastify';

const apiEndpoint = "http://localhost:3900/api/movies";

const getMovies = async () => {
  const { data: movies } = await http.get(apiEndpoint);
  return movies;
};

const deleteMovie = async movieId => {
  try {
    await http.delete(apiEndpoint + '/' + movieId)
  } catch (error) {
    throw error;
  }
}

export default {
  getMovies,
  deleteMovie
}
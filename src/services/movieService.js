import http from './common/httpService';

const apiEndpoint = "http://localhost:3900/api/movies";

const getMovie = async movieId => {
  const { data: movie } = await http.get(apiEndpoint + '/' + movieId);
  return movie;
}

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
    await http.put(apiEndpoint + '/' + id, movie);
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
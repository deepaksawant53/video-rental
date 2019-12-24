import http from './common/httpService';

const apiEndpoint = "http://localhost:3900/api/movies";

const getMovies = async () => {
  const { data: movies } = await http.get(apiEndpoint);
  return movies;
};

export default getMovies;
import http from './common/httpService';

const apiEndpoint = "http://localhost:3900/api/genres";

const getGenres = async () => {
  const { data: genres } = await http.get(apiEndpoint);
  return genres;
};

export default getGenres;
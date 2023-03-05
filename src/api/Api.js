import axios from 'axios';

export const apiServis = async (query, page) => {
  const MY_KEY = '32945444-fd4efa3e9426c87bced8145d3';
  const BASE_URL = 'https://pixabay.com/api/';

  const response = await axios.get(`
  ${BASE_URL}?q=${query}&page=${page}&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
  console.log(response.data);

  return response.data.hits;
};

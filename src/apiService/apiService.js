const apiKey = '16340198-dc2f265d0add10e2fffcbdf49';
const apiUrl = 'https://pixabay.com/api';

function fetchHits(searchQuery, page) {
  const url = `${apiUrl}?q=${searchQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url).then(response => response.json());
}

const apiService = {
  fetchHits,
};

export default apiService;

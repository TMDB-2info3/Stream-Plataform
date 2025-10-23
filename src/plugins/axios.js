import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTI2NzhiZDM4YTI2YzUyYmViZTY3YzkyNTRkMmMyMCIsIm5iZiI6MTc1OTUxMDgxMC45MDEsInN1YiI6IjY4ZTAwMTFhZjgyZTU2Nzc5MWMyZWE0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vstT0785G628qa7iVnaZpuwJawwa8YiYjCqCAm9baoI`,
  },
});

export default api;
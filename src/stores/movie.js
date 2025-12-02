import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useMovieStore = defineStore('movie', () => {
  const state = reactive({
    currentMovie: {},
    providerMovies: [],
  });

  const currentMovie = computed(() => state.currentMovie);
  const providerMovies = computed(() => state.providerMovies);

  const getMovieDetail = async (movieId) => {
    const response = await api.get(`movie/${movieId}`);
    state.currentMovie = response.data;
  };

  const getMoviesByProvider = async (providerId) => {
    const response = await api.get(
      `discover/movie?with_watch_providers=${providerId}&watch_region=BR`
    );

    state.providerMovies = response.data.results;
  };

  return { 
    currentMovie, 
    providerMovies,
    getMovieDetail, 
    getMoviesByProvider
  };
});

<script setup>
import { watch, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMovieStore } from '@/stores/movie';
import { useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute();
const movieStore = useMovieStore();

const providerMovies = computed(() => movieStore.providerMovies);

const fetchMovies = (providerId) => {
  if (providerId) {
    movieStore.getMoviesByProvider(providerId);
  }
}

onMounted(() => {
  fetchMovies(route.query.providerId);
});

watch(
  () => route.query.providerId,
  (newProviderId) => {
    fetchMovies(newProviderId);
  }
);

function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } });
}

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString();
}
</script>

<template>
  <div class="movie-list">
    <div v-for="movie in providerMovies" :key="movie.id" class="movie-card">
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" @click="openMovie(movie.id)" />
      <div class="movie-details">
        <p class="movie-title">{{ movie.title }}</p>
        <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
      </div>
    </div>
  </div>
</template>

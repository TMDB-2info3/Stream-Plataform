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

<style scoped>

.movie-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
     margin-bottom: 4rem;

}


.movie-card {
    width: 15rem;
    height: 30rem;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow:  0.3rem 0.5rem #937217;
    background-color: #6C0A0A;
}

.movie-card img {
    width: 100%;
    height: 20rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem #000;
}

.movie-details {
    padding: 0 0.5rem;
    color: white;
}

.movie-title {
    font-size: 1.1rem;
    font-weight: bold;
    line-height: 1.3rem;
    height: 3.2rem;
    color: white;
}

.movie-genres {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    gap: 0.2rem;

}

.movie-genres span {
    background-color: #937217;
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    color: #fff;
    font-size: 0.8rem;
    font-weight: bold;

}

.movie-genres span:hover {
    cursor: pointer;
    background-color: #937217;
    box-shadow: 0 0 0.5rem #c5ae2e;
}

.active {
    background-color: #a51515;
    font-weight: bolder;
}

.movie-genres span.active {
    background-color: #c29519;
    color: #000;
    font-weight: bolder;
}
.load-more-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.load-more-btn {
  background-color: #6C0A0A;
  color: white;
  font-size: 1rem;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
}

.load-more-btn:hover {
  background-color: #a51616;
  transform: scale(1.05);
  color: #000;
}
</style>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useGenreStore } from '@/stores/genre';
import { useRouter } from 'vue-router'

const router = useRouter()
const genreStore = useGenreStore();
const isLoading = ref(false);
const movies = ref([]);

const listMovies = async (genreId) => {
    genreStore.setCurrentGenreId(genreId);
    isLoading.value = true;
    const response = await api.get('discover/movie', {
        params: {
            with_genres: genreId,
            language: 'pt-BR',
        },
    });
    movies.value = response.data.results;
    isLoading.value = false;
};

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } });
}

onMounted(async () => {
    isLoading.value = true;
    await genreStore.getAllGenres('movie');
    isLoading.value = false;
});
</script>
<template>
    <h1>Filmes</h1>
    <ul class="genre-list">
        <li v-for="genre in genreStore.genres" :key="genre.id" @click="listMovies(genre.id)" class="genre-item"
            :class="{ active: genre.id === genreStore.currentGenreId }">
            {{ genre.name }}
        </li>
    </ul>
    <loading v-model:active="isLoading" is-full-page />
    <div class="movie-list">
        <div v-for="movie in movies" :key="movie.id" class="movie-card">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title"
                @click="openMovie(movie.id)" />
            <div class="movie-details">
                <p class="movie-title">{{ movie.title }}</p>
                <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
                <p class="movie-genres">
                    <span v-for="genre_id in movie.genre_ids" :key="genre_id" @click="listMovies(genre_id)"
                        :class="{ active: genre_id === genreStore.currentGenreId }">
                        {{ genreStore.getGenreName(genre_id) }}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.genre-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    list-style: none;
    margin-bottom: 2rem;
}

.genre-item {
    background-color: #6C0A0A;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    color: #fff;
}

.genre-item:hover {
    cursor: pointer;
    background-color: #961d1d;
    box-shadow: 0 0 0.5rem #6C0A0A;
}

.movie-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

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
    background-color: #937217; /* Muda a cor da parte do filtro de generos em baixo das fotos dos filmes*/
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    color: #fff; /*Muda a cor das letras do filtro de generos*/
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
</style>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import Loading from 'vue-loading-overlay'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)
const movies = ref([])
const tvs = ref([])

let currentPage = 1
const totalPagesToLoad = 3

const loadContent = async () => {
  isLoading.value = true

  let moviesResults = []
  let tvResults = []

  for (let page = currentPage; page < currentPage + totalPagesToLoad; page++) {
    const movieResponse = await api.get('discover/movie', {
      params: {
        language: 'pt-BR',
        sort_by: 'popularity.desc',
        page
      }
    })
    moviesResults.push(...movieResponse.data.results)

    const tvResponse = await api.get('discover/tv', {
      params: {
        language: 'pt-BR',
        sort_by: 'popularity.desc',
        page
      }
    })
    tvResults.push(...tvResponse.data.results)
  }

  currentPage += totalPagesToLoad

  movies.value.push(...moviesResults)
  tvs.value.push(...tvResults)

  isLoading.value = false
}

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } })
}

function openTv(tvId) {
  router.push({ name: 'TvDetails', params: { tvId } })
}

onMounted(() => {
  loadContent()
})
</script>

<template>
  <section>
    <div class="texto">
      <h1>
        Seja bem vindo ao StreamPlatform!
      </h1>
      <p>
        Aqui você encontrará uma grande variedade de <br> filmes, além de saber em qual plataforma de <br> streaming cada um está disponível.  <br> Aproveite e descubra seu próximo filme favorito!
      </p>
    </div>
    <div class="imagem">
      <img src="/public/img/boas-vindas.png" alt="boas/vindas" width="480vw" height="480vw">
    </div>
  </section>

  <hr>

  <loading v-model:active="isLoading" is-full-page />

  <div class="movie-list">
    <div v-for="movie in movies" :key="movie.id" class="movie-card">
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
          @click="openMovie(movie.id)" />
      <div class="movie-details">
        <p class="movie-title">{{ movie.title }}</p>
        <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
      </div>
    </div>
  </div>

  <div class="tv-list">
    <div v-for="tv in tvs" :key="tv.id" class="tv-card">
      <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`"
          :alt="tv.name"
          @click="openTv(tv.id)" />
      <div class="tv-details">
        <p class="tv-name">{{ tv.name }}</p>
        <p class="tv-release-date">{{ formatDate(tv.first_air_date) }}</p>
      </div>
    </div>
  </div>

  <div class="btn-container">
    <button class="btn-vermais" @click="loadContent">Ver mais</button>
  </div>
</template>

<style scoped>
section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.texto {
  text-align: center;
  margin: 4vw 0 0 15vw;
}
.texto h1 {
  font-size: 2.2vw;
}
.texto p {
  font-size: 1.3vw;
  margin-top: 1vw;
}
div.imagem {
  margin: 4vw 15vw 0 0;
}
hr {
  margin: 6vw 3vw 7vw 3vw;
  border: 4.3px solid #1D1D1D;
}

.movie-list, .tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.movie-card, .tv-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #6C0A0A;
  padding: 1vw;
}
.movie-card img, .tv-card img{
  width: 100%;
  height: 20rem;
  border: 3px solid #937217;
  border-radius: 10px;
}

.movie-title, .tv-name {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
  color: rgb(255, 255, 255);
}

.btn-container {
  margin-top: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-vermais {
  background-color: #6C0A0A;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.btn-vermais:hover {
  background-color: #a51616;
  color: #000;
}
</style>

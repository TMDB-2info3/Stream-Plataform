<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import Loading from 'vue-loading-overlay'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)
const movies = ref([])
const tvs = ref([])

const loadMovies = async () => {
  isLoading.value = true

  let results = []

  for (let page = 1; page <= 3; page++) { 
    const response = await api.get('discover/movie', {
      params: {
        language: 'pt-BR',
        sort_by: 'popularity.desc',
        page
      }
    })
    results.push(...response.data.results)
  }

  movies.value = results
  isLoading.value = false
}

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } })
}

onMounted(() => {
  loadMovies()
})



const loadTVs = async () => {
  isLoading.value = true

  let results = []

  for (let page = 1; page <= 3; page++) { // 5 páginas = ~100 séries
    const response = await api.get('discover/tv', {
      params: {
        language: 'pt-BR',
        sort_by: 'popularity.desc',
        page
      }
    })
    results.push(...response.data.results)
  }

  tvs.value = results
  isLoading.value = false
}

function openTv(tvId) {
  router.push({ name: 'TvDetails', params: { tvId } })
}

onMounted(() => {
  loadTVs()
})
</script>
<template>
  <div>
    <h1>Home</h1>
  </div>

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
      <img
        :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`"
        :alt="tv.name"
        @click="openTv(tv.id)"
      />
      <div class="tv-details">
        <p class="tv-name">{{ tv.name }}</p>
        <p class="tv-release-date">{{ formatDate(tv.first_air_date) }}</p>
      </div>
    </div>
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

}

.movie-card, .tv-card {
    width: 15rem;
    height: 30rem;
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: #6C0A0A;
    padding: 1vw;
}

.movie-card img, .tv-card img {
    width: 100%;
    height: 20rem;
    border-radius: 0.5rem;
    border: 3px solid #937217; 
    border-radius: 10px;
}

.movie-details, .tv-datails {
    padding: 0 0.5rem;
    color: #8C8A8A;
}

.movie-title, .tv-name {
    font-size: 1.1rem;
    font-weight: bold;
    line-height: 1.3rem;
    height: 3.2rem;
    color: rgb(255, 255, 255);
}

.movie-genres {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    gap: 0.2rem;

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

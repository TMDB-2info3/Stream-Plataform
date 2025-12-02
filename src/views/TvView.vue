<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useGenreStore } from '@/stores/genre';
import { useRouter } from 'vue-router'

const genreStore = useGenreStore();
const isLoading = ref(false);
const tvs = ref([]);
const page = ref(1);
const router = useRouter()

const listTVs = async (genreId, reset = true) => {
  genreStore.setCurrentGenreId(genreId);

  if (reset) {
    page.value = 1;
    tvs.value = [];
  }

  isLoading.value = true;
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
      page: page.value
    }
  });

  tvs.value = [...tvs.value, ...response.data.results]
  isLoading.value = false;
};

function loadMore() {
  page.value++;
  listTVs(genreStore.currentGenreId, false);
}

function openTv(tvId) {
  router.push({ name: 'TvDetails', params: { tvId } });
}

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('tv');
  isLoading.value = false;
});
</script>

<template>
  <h1>Programas de TV</h1>

  <ul class="genre-list">
    <li v-for="genre in genreStore.genres" :key="genre.id"
        @click="listTVs(genre.id)"
        class="genre-item"
        :class="{ active: genre.id === genreStore.currentGenreId }">
      {{ genre.name }}
    </li>
  </ul>

  <loading v-model:active="isLoading" is-full-page />

  <div class="tv-list">
    <div v-for="tv in tvs" :key="tv.id" class="tv-card">
      <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`"
           :alt="tv.name"
           @click="openTv(tv.id)"/>
      <div class="tv-details">
        <p class="tv-name">{{ tv.name }}</p>
        <p class="tv-release-date">{{ formatDate(tv.first_air_date) }}</p>
        <p class="tv-genres">
          <span v-for="genre_id in tv.genre_ids"
                :key="genre_id"
                @click.stop="listTVs(genre_id)"
                :class="{ active: genre_id === genreStore.currentGenreId }">
            {{ genreStore.getGenreName(genre_id) }}
          </span>
        </p>
      </div>
    </div>
  </div>

  <div class="see-more" v-if="tvs.length">
    <button @click="loadMore">Ver Mais</button>
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
  align-self: center;
  color: #fff;
  display: flex;
  justify-content: center;
  transition: 0.3s;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #961d1d;
  box-shadow: 0 0 0.5rem #6C0A0A;
}

.tv-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.tv-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #6C0A0A;
  box-shadow: 0 0 0.5rem var(--shadow-color);
}

.tv-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.tv-details {
  padding: 0 0.5rem;
  color: white;
}

.tv-name {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
  color: white;
}

.tv-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
  justify-content: center;
}

.tv-genres span {
  background-color: #937217;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
}

.tv-genres span.active {
  background-color: #c29519;
  color: #000;
  font-weight: bolder;
}

.see-more {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.see-more button {
  background-color: #6C0A0A;
  color: #fff;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  transition: 0.3s;
  cursor: pointer;
}

.see-more button:hover {
  background-color: #a51616;
  color: #000;
}
</style>

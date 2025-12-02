<script setup>
import { useSearchStore } from '@/stores/search.js';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const searchStore = useSearchStore();
const router = useRouter();


const visibleCount = ref(12);

const formatDate = (date) => date ? new Date(date).toLocaleDateString('pt-BR') : 'N/A';

function openItem(item) {
  if (item.type === 'movie') {
    router.push({ name: 'MovieDetails', params: { movieId: item.id } });
  } else if (item.type === 'tv') {
    router.push({ name: 'TvDetails', params: { tvId: item.id } });
  }
}

function loadMore() {
  visibleCount.value += 12;
}
</script>

<template>
  <div>
    <div v-if="searchStore.filteredResults.length" class="search-results">


      <div v-for="item in searchStore.filteredResults.slice(0, visibleCount)"
           :key="item.id"
           class="item-card">
        <img
          :src="item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'"
          :alt="item.title || item.name"
          @click="openItem(item)"
        />
        <div class="item-details">
          <p class="item-title">{{ item.title || item.name }}</p>
          <p class="item-release-date">{{ formatDate(item.release_date || item.first_air_date) }}</p>
          <p v-if="item.overview" class="item-overview">{{ item.overview }}</p>
        </div>
      </div>


      <div v-if="visibleCount < searchStore.filteredResults.length" class="load-more-container">
        <button class="load-more-btn" @click="loadMore">Ver mais</button>
      </div>

    </div>

    <div v-else>
      <p>Nenhum resultado encontrado.</p>
    </div>
  </div>
</template>

<style scoped>
.search-results {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.item-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #6C0A0A;
  padding: 1vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.item-card:hover {
  cursor: pointer;
  transform: translateY(-5px);
  box-shadow: 0 0 1rem var(--shadow-color);
}

.item-card img {
  width: 100%;
  height: 20rem;
  object-fit: cover;
  border: 3px solid #937217;
  border-radius: 10px;
}

.item-details {
  padding: 0.5rem;
  text-align: center;
  color: #8C8A8A;
}

.item-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
  overflow: hidden;
  color: #fff;
}
.load-more-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
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
}
</style>

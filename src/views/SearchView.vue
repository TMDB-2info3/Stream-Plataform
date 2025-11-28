<script setup>
import { useSearchStore } from '@/stores/search.js';
import { useRouter } from 'vue-router';

const searchStore = useSearchStore();
const router = useRouter();

const formatDate = (date) => date ? new Date(date).toLocaleDateString('pt-BR') : 'N/A';

function openItem(item) {
  if(item.type === 'movie') {
    router.push({ name: 'MovieDetails', params: { movieId: item.id } });
  } else if(item.type === 'tv') {
    router.push({ name: 'TvDetails', params: { tvId: item.id } });
  }
}

</script>

<template>
  <div>
    <div v-if="searchStore.filteredResults.length" class="search-results">
      <div v-for="item in searchStore.filteredResults" :key="item.id" class="item-card">
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
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.item-card:hover {
  cursor: pointer;
  transform: translateY(-5px);
  box-shadow: 0 0 1rem #000;
}

.item-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  object-fit: cover;
}

.item-details {
  padding: 0.5rem;
  text-align: center;
}

.item-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
  overflow: hidden;
}

.item-release-date {
  font-size: 0.9rem;
  margin: 0.2rem 0;
}

.item-overview {
  font-size: 0.85rem;
  margin-top: 0.5rem;
  color: #333;
  max-height: 4.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

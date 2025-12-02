import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useSearchStore = defineStore('search', {
  state: () => ({
    filterText: '',
    filteredResults: [],
  }),
  actions: {
    async searchAll(query) {
      this.filterText = query;
      if (!query) {
        this.filteredResults = [];
        return;
      }

      const [movies, tvs] = await Promise.all([
        api.get(`/search/movie`, {
          params: {
            query: query,
            language: 'pt-BR'
          }
        }),
        api.get(`/search/tv`, {
          params: {
            query: query,
            language: 'pt-BR'
          }
        })
      ]);

      this.filteredResults = [
        ...movies.data.results.map(r => ({ ...r, type: 'movie' })),
        ...tvs.data.results.map(r => ({ ...r, type: 'tv' }))
      ];
    }
  }
});

import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useProviderStore = defineStore('provider', () => {
    const state = reactive({
        currentProviders: {},
    });

    const currentProviders = computed(() => state.currentProviders);

    const getProvidersDetail = async () => {
    const response = await api.get(`https://api.themoviedb.org/3/watch/providers/movie?language=pt-BR&watch_region=BR`);
    state.currentProviders = response.data;
  };

  return { currentProviders, getProvidersDetail };
});

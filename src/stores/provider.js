import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useProviderStore = defineStore('provider', () => {
    const state = reactive({
        currentProviders: {},
    });

    const currentProviders = computed(() => state.currentProviders);

    const getProvidersDetail = async (movieId) => {
    const response = await api.get(`movie/${movieId}/watch/providers`);
    state.currentProviders = response.data;
  };

  return { currentProviders, getProvidersDetail };
});

<script setup>
import { ref } from 'vue'
import { useProviderStore } from '@/stores/provider'

let trueFalse = ref(false);
const providerStore = useProviderStore();


</script>
<template>
    <header>
        <nav>
            <router-link to="/">
                <span class="mdi mdi-home"></span>
            </router-link>
            <router-link to="/filmes">
                <span class="mdi mdi-movie"></span>
            </router-link>
            <router-link to="/tv">
                <span class="mdi mdi-tv"></span>
            </router-link>

            <span class="mdi mdi-menu" @click=" trueFalse = !trueFalse"></span>
            <ul v-if="trueFalse">
                <li v-for="provider in providerStore.currentProviders.BR?.flatrate || []" :key="provider.provider_id">
                    <img :src="'https://image.tmdb.org/t/p/w92' + provider.logo_path" :alt="provider.provider_name" />
                    {{ provider.provider_name }}
                </li>
            </ul>
        </nav>
    </header>
</template>
<style>
span {
    color: #ffffff;
}
</style>
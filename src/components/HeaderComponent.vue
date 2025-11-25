<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useProviderStore } from '@/stores/provider.js'

let trueFalse = ref(false);
const providerStore = useProviderStore();
const menuHeight = ref('0px')
const headerHeight = ref(0)

const updateMenuHeight = () => {
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    if (header && footer) {
        headerHeight.value = header.offsetHeight
        const viewportHeight = window.innerHeight
        const availableHeight = viewportHeight - header.offsetHeight - footer.offsetHeight
        menuHeight.value = availableHeight + 'px'
    }
}

onMounted(() => {
    providerStore.getProvidersDetail()
    nextTick(updateMenuHeight)
    window.addEventListener('resize', updateMenuHeight)
})

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
                <span class="mdi mdi-television"></span>
            </router-link>

            <div>
                <span class="mdi mdi-menu" @click=" trueFalse = !trueFalse"></span>
                <div v-if="trueFalse" class="menu" :style="{ top: headerHeight + 'px', height: menuHeight }">
                    <ul>
                        <li v-for="provider in providerStore.currentProviders.results || []"
                            :key="provider.provider_id">
                            <img :src="'https://image.tmdb.org/t/p/w45' + provider.logo_path"
                                :alt="provider.provider_name" />

                            <p> {{ provider.provider_name }} </p>
                        </li>
                    </ul>
                </div>
            </div>

        </nav>
    </header>
</template>
<style scoped>
header {
    background-color: #6C0A0A;
}

span {
    color: #ffffff;
}

.menu {
    position: fixed;
    left: auto;
    right: 0;
    overflow-y: auto;
    background-color: #6C0A0A;
    width: 300px;
    padding: 10px;
    z-index: 10;

    & ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    & li {
        width: 120px;
        height: 140px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;
        cursor: pointer;
        padding: 5px;
        border-radius: 4px;
        transition: background 0.2s;
        background-color: #7d0b0b;

        & p {
            text-align: center;
            font-size: calc(6px + 0.390625vw);
        }
    }

    & li:hover {
        background: #8C1313;
    }

    & img {
        object-fit: contain;
        margin-bottom: 5px;
    }
}
</style>
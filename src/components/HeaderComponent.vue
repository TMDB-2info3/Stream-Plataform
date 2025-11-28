<script setup>
import { ref, onMounted, nextTick, defineEmits, watch } from 'vue'
import { useProviderStore } from '@/stores/provider.js'
import { useSearchStore } from '@/stores/search.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchStore = useSearchStore();
const searchText = ref('');

watch(searchText, async (val) => {
  await searchStore.searchAll(val);
  if (val.trim() !== '') {
    router.push('/search');
  }
});


let trueFalse = ref(false);
let lightDark = ref(false);
const providerStore = useProviderStore();
const menuHeight = ref('0px')
const headerHeight = ref(0)

const emit = defineEmits(['toggle-lightDark', 'toggle-menu'])

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

    nextTick(() => {
        updateMenuHeight()
    })

    window.addEventListener('resize', updateMenuHeight)
})
</script>

<template>
    <header>
        <img src="/img/logo.png" alt="">
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

        </nav>

        <div class="search-wrapper">
            <input type="text" class="search" placeholder="Pesquisar..." v-model="searchText"/> 
            <span class="mdi mdi-magnify"></span>
        </div>

        <span class="mdi" :class="lightDark ? 'mdi-brightness-4' : 'mdi-brightness-5'"
            @click="() => { lightDark = !lightDark; emit('toggle-lightDark', lightDark) }">
        </span>


        <nav>
            <div>
                <span class="mdi" :class="trueFalse ? 'mdi-close' : 'mdi-menu'"
                    @click="() => { updateMenuHeight(); trueFalse = !trueFalse; emit('toggle-menu', trueFalse) }"></span>
                <div v-if="trueFalse" class="menu" :style="{ top: headerHeight + 'px', height: menuHeight }">
                    <ul>
                        <li v-for="provider in providerStore.currentProviders.results || []"
                            :key="provider.provider_id">

                            <router-link to="/onde-assistir">
                                <img :src="'https://image.tmdb.org/t/p/w45' + provider.logo_path"
                                    :alt="provider.provider_name" />

                                <p> {{ provider.provider_name }} </p>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </header>
</template>
<style scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: #6C0A0A;
    height: calc(4rem + 0.390625vw);
    color: #fff;
    font-size: calc(1.2rem + 0.390625vw);
    padding-left: 1vw;
    display: flex;
    align-items: center;

    & nav {
        display: flex;
        align-items: center;
        width: 50%;
    }

    & nav:last-of-type div {
        margin-left: auto;
        padding-right: 20px;
    }

    img {
        height: 5vw;
    }
}

span {
    color: #ffffff;
    font-size: 150%;
}

:deep(.search-wrapper .mdi-magnify) {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 90%;
    pointer-events: none;
    color: #6C0A0A;
}

.search-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    & input {
        font-size: 90%;
        border-radius: 5px;
        border: none;
        padding-left: 10px;
        height: 32px;
    }

}

.menu {
    position: fixed;
    left: auto;
    top: 0;
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

        & a {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            width: 100%;
            height: 100%;
            text-decoration: none;
            color: white;

            & p {
                text-align: center;
                font-size: calc(6px + 0.390625vw);
                height: 25%;
            }

            img {
                object-fit: contain;
                margin-bottom: 5px;
                width: auto;
                height: auto;
            }
        }
    }

    & li:hover {
        background: #8C1313;
    }
}
</style>
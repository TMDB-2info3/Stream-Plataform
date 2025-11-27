<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
import { ref } from 'vue'

let isOpen = ref(false);
let lightDark = ref(false);
</script>

<template>
  <HeaderComponent @toggle-menu="isOpen = $event"
  @toggle-lightDark="lightDark = $event" />
  <main :class="{ 'dark-mode': lightDark, 'light-mode': !lightDark }" :style="{ marginRight: isOpen ? '300px' : '0', transition: 'margin-right 0.3s' }">
    <router-view />
  </main>
  <footer></footer>
  <FooterView />
</template>

<style scoped>
.light-mode {
  background-color: white;
  color: black;
}

.dark-mode {
  background-color: black;
  color: white;
}

</style>

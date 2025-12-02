<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
import { ref } from 'vue';
import FooterView from './views/FooterView.vue';

let isOpen = ref(false);
let lightDark = ref(false);


</script>

<template>
  <HeaderComponent @toggle-menu="isOpen = $event" @toggle-lightDark="lightDark = $event" />
  <main :class="{ 'dark-mode': lightDark, 'light-mode': !lightDark }"
        :style="{ marginRight: isOpen ? '300px' : '0', transition: 'margin-right 0.3s' }">
    <router-view />
  </main>
  <FooterView />
</template>

<style scoped>
.light-mode { 
  background-color: white; 
  color: black; 
  box-shadow: 0 0 1rem black;
}
.dark-mode { 
  background-color: black; 
  color: white; 
  box-shadow: 0 0 1rem white;
}
</style>

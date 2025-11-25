<script setup>
import HeaderComponent from './components/HeaderComponent.vue';

</script>

<template>
  <HeaderComponent />
  <main>
    <router-view />
  </main>
  <footer></footer>
  <FooterView />
</template>

<style scoped>
header {
  height: 3rem;
  display: flex;
  background-color: black;
  color: #fff;
  font-size: 1.2rem;
  padding-left: 2rem;
}

nav {
  column-gap: 2rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: #fff;
}
</style>

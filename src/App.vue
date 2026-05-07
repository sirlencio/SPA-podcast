<script setup lang="ts">
import HeaderNav from './components/HeaderNav.vue'
</script>

<template>
  <HeaderNav />

  <main class="container">
    <RouterView />
  </main>
</template>

<style lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
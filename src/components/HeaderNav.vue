<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useEpisodeStore } from '../stores/useEpisodeStore';
import { usePodcastStore } from '../stores/usePodcastStore';

const podcastStore = usePodcastStore();
const episodeStore = useEpisodeStore();
</script>

<template>
  <header class="main-header">
    <RouterLink :to="{ name: 'home' }" class="logo-link">
      <h1 class="logo">
        Podcaster
      </h1>
    </RouterLink>

    <div v-if="podcastStore.loading || episodeStore.loading" class="loading-indicator">
      <div class="spinner"></div>
    </div>
  </header>
</template>


<style lang="scss" scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 2rem;

  .logo-link {
    text-decoration: none;

    .logo {
      color: #3c74a9;
      font-weight: bold;
      font-size: 1.5rem;
      margin: 0;
    }
  }

  .loading-indicator {
    .spinner {
      width: 20px;
      height: 20px;
      border: 3px solid rgba(60, 116, 169, 0.3);
      border-radius: 50%;
      border-top-color: #3c74a9;
      animation: spin 1s ease-in-out infinite;
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
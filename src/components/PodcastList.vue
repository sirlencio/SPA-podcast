<script setup lang="ts">
import PodcastCard from './PodcastCard.vue';
import type { Podcast } from '../types/Podcast';

defineProps<{ podcasts: Podcast[] }>();
</script>

<template>
  <div class="podcast-grid">
    <PodcastCard v-for="podcast in podcasts" :key="podcast.id" :podcast="podcast" />
  </div>
</template>

<style lang="scss" scoped>
.podcast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 40px 20px;
  padding: 20px 20px;
}
</style>
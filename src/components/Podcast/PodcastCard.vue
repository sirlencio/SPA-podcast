<script setup lang="ts">
import type { Podcast } from '../../types/Podcast';

defineProps<{ podcast: Podcast }>();
</script>

<template>
  <RouterLink :to="{ name: 'podcast', params: { podcastId: podcast.id } }" class="podcast-card">
    <div class="card-inner">
      <img :src="podcast.image" :alt="podcast.name" class="avatar" />
      <div class="info">
        <h3 class="title">{{ podcast.name.toUpperCase() }}</h3>
        <p class="artist">Author: {{ podcast.artist }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.podcast-card {
  text-decoration: none;
  color: #333;
  display: block;
  margin-top: 50px;

  .card-inner {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 20px 15px;
    text-align: center;
    position: relative;
    height: 100%;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .avatar {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      position: absolute;
      top: -55px;
      left: 50%;
      transform: translateX(-50%);
      object-fit: cover;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .info {
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      gap: 4px; 
    }

    .title {
      font-size: 0.85rem;
      font-weight: 700;
      margin: 10px 0;
      line-height: 1.2;
    }

    .artist {
      color: #777;
      font-size: 0.75rem;
      margin: 0;
    }
  }
}
</style>
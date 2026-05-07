<script setup lang="ts">
import EpisodeList from '../components/Episode/EpisodeList.vue';
import PodcastDetail from '../components/Podcast/PodcastDetail.vue';
</script>

<template>
  <main class="podcast-layout">
    <section class="left-panel">
      <PodcastDetail />
    </section>

    <section class="right-panel">
      <EpisodeList />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.podcast-layout {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  align-items: flex-start;

  .left-panel {
    flex: 0 0 300px;
    position: sticky;
    top: 1.5rem;
  }

  .right-panel {
    flex: 1;
  }
}
</style>
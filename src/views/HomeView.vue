<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { usePodcastStore } from '../stores/usePodcastStore';
import PodcastList from '../components/Podcast/PodcastList.vue';
import SearchBar from '../components/SearchBar.vue';
import { filterPodcasts } from '../utils/filterPodcasts';

const podcastStore = usePodcastStore();
const filterText = ref('');

onMounted(async () => {
  podcastStore.loadFromLocalStorage();
  await podcastStore.fetchTopPodcasts();
});

const filteredPodcasts = computed(() => {
  return filterPodcasts(podcastStore.podcasts, filterText.value)
});

function updateFilterText(newFilterText: string) {
  filterText.value = newFilterText;
}
</script>

<template>
  <div class="home-view">
    <div class="header-actions">
      <SearchBar :count="filteredPodcasts.length" @filter="updateFilterText" />
    </div>

    <PodcastList v-if="filteredPodcasts.length > 0" :podcasts="filteredPodcasts" />

    <div v-else-if="!podcastStore.loading" class="no-results">
      <p>No se han encontrado podcasts que coincidan con tu búsqueda.</p>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  .header-actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 40px;
  }

  .no-results {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    text-align: center;

    p {
      font-size: 1.2rem;
      color: #666;
      font-style: italic;
    }
  }
}
</style>
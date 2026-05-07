<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useEpisodeStore } from '../../stores/useEpisodeStore';

const route = useRoute();
const store = useEpisodeStore();
const podcastId = route.params.podcastId as string;
const episodeId = route.params.episodeId as string;

onMounted(() => {
    store.fetchEpisodes(podcastId);
});

const episode = computed(() => {
    const cache = store.podcastCache[podcastId];
    if (!cache) return null;

    return cache.episodes.find(e => String(e.id) === episodeId) || null;
});
</script>

<template>
    <div v-if="episode" class="episode-container card">
        <h2 class="title">{{ episode.title }}</h2>

        <p class="description" v-html="episode.description"></p>

        <hr class="separator" />

        <div class="audio-player">
            <audio controls :src="episode.audioUrl">
                Tu navegador no soporta el elemento de audio.
            </audio>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.episode-container {
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 25px;
    border: 1px solid #ddd;

    .title {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 10px;
        color: #333;
    }

    .description {
        overflow-wrap: break-word;
        word-break: break-word;
        font-size: 1rem;
        line-height: 1.6;
        color: #555;
        font-style: italic;
        margin-bottom: 20px;
        white-space: pre-line;
    }

    .separator {
        border: 0;
        border-top: 2px solid #f0f0f0;
        margin: 20px 0;
    }

    .audio-player {
        width: 100%;

        audio {
            width: 100%;
            margin-top: 10px;
        }
    }
}
</style>
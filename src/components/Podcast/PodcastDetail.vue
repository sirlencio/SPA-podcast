<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { usePodcastStore } from '../../stores/usePodcastStore';

const route = useRoute();
const store = usePodcastStore();

onMounted(() => {
    store.loadFromLocalStorage();
});

const podcast = computed(() => {
    const podcastId = route.params.podcastId as string;
    return store.podcasts.find(p => p.id === podcastId);
});
</script>

<template>
    <div v-if="podcast" class="podcast-card">
        <div class="image-container">
            <RouterLink :to="{ name: 'podcast', params: { podcastId: podcast.id } }">
                <img :src="podcast.image" :alt="podcast.name" />
            </RouterLink>
        </div>
        <hr class="separator" />

        <div class="info">
            <RouterLink :to="{ name: 'podcast', params: { podcastId: podcast.id } }">
                <h2 class="title">{{ podcast.name }}</h2>
                <p class="author">por <span>{{ podcast.artist }}</span></p>
            </RouterLink>
        </div>


        <hr class="separator" />

        <div class="description">
            <h3>Descripción:</h3>
            <p>{{ podcast.summary }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.podcast-card {
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 280px;
    border: 1px solid #ddd;
    position: sticky;
    top: 20px;

    .image-container {
        margin-bottom: 15px;

        img {
            width: 100%;
            height: auto;
            border-radius: 4px;
            display: block;
        }
    }

    .separator {
        border: 0;
        border-top: 1px solid #eeeeee;
        margin: 15px 0;
    }

    .info {
        text-align: center;

        a {
            margin: auto;
        }

        .title {
            font-size: 1.1rem;
            font-weight: 700;
            margin: 0;
            color: #333;
        }

        .author {
            font-size: 0.85rem;
            margin-top: 4px;
            color: #666;
            font-style: italic;

            span {
                color: #444;
            }
        }
    }

    .description {
        h3 {
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 5px;
            color: #333;
        }

        p {
            font-size: 0.85rem;
            line-height: 1.4;
            color: #555;
            font-style: italic;
            word-wrap: break-word;
        }
    }
}
</style>
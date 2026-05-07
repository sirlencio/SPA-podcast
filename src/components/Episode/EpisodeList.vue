<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useEpisodeStore } from '../../stores/useEpisodeStore';

const route = useRoute();
const store = useEpisodeStore();
const podcastId = route.params.podcastId as string;

onMounted(() => {
    store.fetchEpisodes(podcastId);
});

const episodesData = computed(() => {
    return store.podcastCache[podcastId]?.episodes || [];
});
</script>

<template>
    <main class="main-content">
        <section class="episodes-count card">
            <h2>Episodios: {{ episodesData.length }}</h2>
        </section>

        <section class="episodes-list card">
            <table class="episodes-table">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Fecha</th>
                        <th>Duración</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="episode in episodesData" :key="episode.id">
                        <td>
                            <RouterLink :to="{ name: 'episode', params: { podcastId, episodeId: episode.id } }"
                                class="episode-link">
                                {{ episode.title }}
                            </RouterLink>
                        </td>
                        <td>{{ episode.date }}</td>
                        <td class="text-center">{{ episode.duration }}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </main>
</template>

<style lang="scss" scoped>
.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .card {
        background: #fff;
        padding: 15px 25px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .episodes-count h2 {
        font-size: 1.4rem;
        margin: 0;
    }

    .episodes-table {
        width: 100%;
        border-collapse: collapse;

        thead {
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        th {
            text-align: left;
            padding: 10px;
            border-bottom: 2px solid #eee;
        }

        td {
            padding: 12px 10px;
            border-bottom: 1px solid #eee;
            font-size: 0.9rem;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        .episode-link {
            color: #3273dc;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }

        .text-center {
            text-align: center;
        }
    }
}
</style>
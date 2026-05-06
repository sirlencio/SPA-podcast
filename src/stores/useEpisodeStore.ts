import { ref } from "vue";
import { defineStore } from "pinia";
import type { Episode } from "../types/Episode";
import { mapEpisodes } from "../utils/mapper";

export const useEpisodeStore = defineStore('detail', () => {
    const podcastCache = ref<Record<string, { episodes: Episode[], lastUpdated: number }>>({});
    const loading = ref(false);

    const fetchEpisodes = async (podcastId: string) => {
        const now = Date.now();

        if (Object.keys(podcastCache.value).length === 0) {
            const saved = localStorage.getItem('podcast_detail_storage');
            if (saved) podcastCache.value = JSON.parse(saved);
        }

        const cached = podcastCache.value[podcastId];
        if (cached && (now - cached.lastUpdated < 86400000)) return;

        try {
            loading.value = true;
            const response = await fetch(`/api/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`);
            const data = await response.json();

            const episodes = mapEpisodes(data.results);

            podcastCache.value[podcastId] = {
                episodes,
                lastUpdated: now
            };

            saveToLocalStorage();
        } catch (err) {
            console.error("Error fetching detail", err);
        } finally {
            loading.value = false;
        }
    };

    const saveToLocalStorage = () => {
        localStorage.setItem('podcast_detail_storage', JSON.stringify(podcastCache.value));
    };

    return { podcastCache, loading, fetchEpisodes };
});
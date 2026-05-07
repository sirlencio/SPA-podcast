import { ref } from "vue";
import type { Podcast } from "../types/Podcast"
import { defineStore } from "pinia";
import { mapPodcasts } from "../utils/mapper";
import { shouldFetch } from "../utils/cache";

export const usePodcastStore = defineStore('podcasts', () => {
    const podcasts = ref<Podcast[]>([]);
    const loading = ref(false);
    const lastUpdated = ref<number | null>(null);

    const fetchTopPodcasts = async () => {
        if (!shouldFetch(lastUpdated.value ?? undefined, podcasts.value.length > 0)) {
            return;
        }

        const now = Date.now();

        try {
            loading.value = true;
            const response = await fetch("/api/us/rss/toppodcasts/limit=100/genre=1310/json");
            if (!response.ok) throw new Error("Fetch error");

            const data = await response.json();

            podcasts.value = mapPodcasts(data.feed.entry);
            lastUpdated.value = now;
            
            saveToLocalStorage();
        } catch (err) {
            console.error("Error fetching podcasts:", err);
        } finally {
            loading.value = false;
        }
    }

    const saveToLocalStorage = () => {
        localStorage.setItem('podcast_storage', JSON.stringify({
            podcasts: podcasts.value,
            lastUpdated: lastUpdated.value
        }));
    };

    const loadFromLocalStorage = () => {
        const saved = localStorage.getItem('podcast_storage');
        if (saved) {
            const { podcasts: savedPodcasts, lastUpdated: savedTime } = JSON.parse(saved);
            podcasts.value = savedPodcasts;
            lastUpdated.value = savedTime;
        }
    };

    return { podcasts, loading, lastUpdated, fetchTopPodcasts, loadFromLocalStorage }
})
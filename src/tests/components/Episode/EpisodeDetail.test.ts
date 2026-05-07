// @vitest-environment happy-dom
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { nextTick } from 'vue';
import { useEpisodeStore } from '../../../stores/useEpisodeStore';
import EpisodeDetail from '../../../components/Episode/EpisodeDetail.vue';
import type { Episode } from '../../../types/Episode';

const podcastId = '123';
const episodeId = '123123';
const mockEpisode: Episode = {
    id: episodeId,
    title: 'La Amenaza Fantasma',
    description: 'La <strong>República Galáctica</strong> está sumida en el caos.',
    audioUrl: 'https://example.com/podcast.mp3',
    date: "07/05/2026",
    duration: "45:00",
};

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/podcast/:podcastId/episode/:episodeId', 
            name: 'episode', 
            component: { template: '<div></div>' } 
        }
    ]
});

describe('EpisodeDetail.vue', () => {
    beforeEach(async () => {
        setActivePinia(createPinia());
        router.push(`/podcast/${podcastId}/episode/${episodeId}`);
        await router.isReady();

        vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ contents: '{}' })
        })));
    });

    it('debe renderizar el titulo y la descripción (procesando el HTML)', async () => {
        const store = useEpisodeStore();
        vi.spyOn(store, 'fetchEpisodes').mockImplementation(async () => {});

        store.podcastCache[podcastId] = {
            episodes: [mockEpisode],
            lastUpdated: Date.now()
        };

        const wrapper = mount(EpisodeDetail, {
            global: { plugins: [router] }
        });

        await nextTick();

        expect(wrapper.find('.title').text()).toBe(mockEpisode.title);

        const description = wrapper.find('.description');
        expect(description.html()).toContain('<strong>República Galáctica</strong>');
    });

    it('debe configurar correctamente el elemento de audio', async () => {
        const store = useEpisodeStore();
        vi.spyOn(store, 'fetchEpisodes').mockImplementation(async () => {});

        store.podcastCache[podcastId] = {
            episodes: [mockEpisode],
            lastUpdated: Date.now()
        };

        const wrapper = mount(EpisodeDetail, {
            global: { plugins: [router] }
        });

        await nextTick();

        const audioElement = wrapper.find('audio');
        expect(audioElement.exists()).toBe(true);
        expect(audioElement.attributes('src')).toBe(mockEpisode.audioUrl);
        expect(audioElement.attributes()).toHaveProperty('controls');
    });

    it('no debe mostrar el contenedor si el episodio no existe', async () => {
        const store = useEpisodeStore();
        vi.spyOn(store, 'fetchEpisodes').mockImplementation(async () => {});
        
        store.podcastCache[podcastId] = { episodes: [], lastUpdated: Date.now() };

        const wrapper = mount(EpisodeDetail, {
            global: { plugins: [router] }
        });

        await nextTick();

        expect(wrapper.find('.episode-container').exists()).toBe(false);
    });
});
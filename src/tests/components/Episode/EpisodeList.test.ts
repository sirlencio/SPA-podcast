// @vitest-environment happy-dom
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { nextTick } from 'vue';
import { useEpisodeStore } from '../../../stores/useEpisodeStore';
import EpisodeList from '../../../components/Episode/EpisodeList.vue';
import type { Episode } from '../../../types/Episode';

const podcastId = '12345';
const mockEpisodes: Episode[] = [
    { id: 'ep1', title: 'Episodio 1: La amenaza fantasma', audioUrl: "", description: "", date: '07/05/2026', duration: '45:00' },
    { id: 'ep2', title: 'Episodio 1: El ataque de los clones', audioUrl: "", description: "", date: '07/05/2026', duration: '45:00' },
];

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/podcast/:podcastId',
            name: 'podcast',
            component: { template: '<div></div>' }
        },
        {
            path: '/podcast/:podcastId/episode/:episodeId',
            name: 'episode',
            component: { template: '<div></div>' }
        }
    ]
});

describe('Episode list', () => {
    beforeEach(async () => {
        setActivePinia(createPinia());
        router.push(`/podcast/${podcastId}`);
        await router.isReady();

        vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ contents: JSON.stringify({ results: [] }) })
        })));
    });

    it('debe mostrar el numero correcto de episodios en el titulo', async () => {
        const store = useEpisodeStore();

        vi.spyOn(store, 'fetchEpisodes').mockImplementation(async () => { });

        store.podcastCache[podcastId] = {
            episodes: mockEpisodes,
            lastUpdated: Date.now()
        };

        const wrapper = mount(EpisodeList, {
            global: { plugins: [router] }
        });

        await nextTick();

        const countHeader = wrapper.find('.episodes-count h2');
        expect(countHeader.text()).toBe(`Episodios: ${mockEpisodes.length}`);
    });

    it('debe renderizar la tabla con los datos de los episodios', async () => {
        const store = useEpisodeStore();
        vi.spyOn(store, 'fetchEpisodes').mockImplementation(async () => { });

        store.podcastCache[podcastId] = {
            episodes: mockEpisodes,
            lastUpdated: Date.now()
        };

        const wrapper = mount(EpisodeList, {
            global: { plugins: [router] }
        });

        await nextTick();

        const rows = wrapper.findAll('tbody tr');
        expect(rows).toHaveLength(2);

        expect(rows[0].text()).toContain('Episodio 1: La amenaza fantasma');
        expect(rows[0].text()).toContain('07/05/2026');
        expect(rows[0].text()).toContain('45:00');
    });

    it('los enlaces de los episodios deben tener la ruta correcta', async () => {
        const store = useEpisodeStore();
        vi.spyOn(store, 'fetchEpisodes').mockImplementation(async () => { });

        store.podcastCache[podcastId] = {
            episodes: mockEpisodes,
            lastUpdated: Date.now()
        };

        const wrapper = mount(EpisodeList, {
            global: { plugins: [router] }
        });

        await nextTick();

        const firstLink = wrapper.findComponent({ name: 'RouterLink' });
        expect(firstLink.props().to).toMatchObject({
            name: 'episode',
            params: {
                podcastId: podcastId,
                episodeId: 'ep1'
            }
        });
    });
});
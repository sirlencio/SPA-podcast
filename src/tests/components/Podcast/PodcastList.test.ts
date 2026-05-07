// @vitest-environment happy-dom

import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { usePodcastStore } from '../../../stores/usePodcastStore';
import PodcastCard from '../../../components/Podcast/PodcastCard.vue';
import HomeView from '../../../views/HomeView.vue';
import { nextTick } from 'vue';

const mockPodcasts = [
    { id: '1', name: 'Podcast Fruta', artist: 'John Doe', image: 'image.jpg', summary: 'placeholder' },
    { id: '2', name: 'Podcast Verdura', artist: 'Jane Doe', image: 'image.jpg', summary: 'placeholder' }
];

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: { template: '<div></div>' } },
        { path: '/podcast/:podcastId', name: 'podcast', component: { template: '<div></div>' } }
    ]
});

describe('Integración Home y PodcastList', () => {
    beforeEach(() => {
        setActivePinia(createPinia());

        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ feed: { entry: [] } })
            })
        ));
    });

    it('debe renderizar tantas tarjetas como podcasts haya en el store', async () => {
        const store = usePodcastStore();
        vi.spyOn(store, 'fetchTopPodcasts').mockImplementation(async () => {});

        store.podcasts = mockPodcasts;
        store.loading = false;

        const wrapper = mount(HomeView, {
            global: {
                plugins: [router]
            }
        });

        await nextTick();

        const cards = wrapper.findAllComponents(PodcastCard);
        expect(cards).toHaveLength(2);
        expect(wrapper.text()).toContain('FRUTA');
        expect(wrapper.text()).toContain('Author: Jane Doe');
    });

    it('debe reducir los resultados visibles cuando el buscador filtra', async () => {
        const store = usePodcastStore();
        vi.spyOn(store, 'fetchTopPodcasts').mockImplementation(async () => {});

        store.podcasts = mockPodcasts;
        store.loading = false;

        const wrapper = mount(HomeView, {
            global: {
                plugins: [router]
            }
        });

        const searchBar = wrapper.findComponent({ name: 'SearchBar' });
        await searchBar.vm.$emit('filter', 'Fruta');
        await nextTick();

        const cards = wrapper.findAllComponents(PodcastCard);
        expect(cards).toHaveLength(1);
        expect(wrapper.text()).toContain('PODCAST FRUTA');
        expect(wrapper.text()).not.toContain('PODCAST VERDURA');
    });

    it('debe mostrar el mensaje de "no resultados" si el filtro no coincide', async () => {
        const store = usePodcastStore();
        vi.spyOn(store, 'fetchTopPodcasts').mockImplementation(async () => {});
        
        store.podcasts = mockPodcasts;
        store.loading = false;

        const wrapper = mount(HomeView, {
            global: {
                plugins: [router]
            }
        });

        const searchBar = wrapper.findComponent({ name: 'SearchBar' });
        await searchBar.vm.$emit('filter', 'Texto que no existe');

        await nextTick();

        expect(wrapper.findAllComponents(PodcastCard)).toHaveLength(0);

        const message = wrapper.find('.no-results');
        expect(message.exists()).toBe(true);
        expect(message.text()).toContain('No se han encontrado podcasts que coincidan con tu búsqueda');
    });
});
// @vitest-environment happy-dom

import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { usePodcastStore } from '../../../stores/usePodcastStore';
import PodcastDetail from '../../../components/Podcast/PodcastDetail.vue';

const mockPodcast = {
    id: '123',
    name: 'Podcast Prueba',
    artist: 'Adam Adamou',
    image: 'img.jpg',
    summary: 'placeholder'
};

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/podcast/:podcastId', name: 'podcast', component: { template: '<div></div>' } }
    ]
});

describe('Podcast Detail', () => {
    beforeEach(async () => {
        setActivePinia(createPinia());
        router.push('/podcast/123');
        await router.isReady();
    });

    it('debe renderizar la informacion correcta del podcast cuando existe en el store', async () => {
        const store = usePodcastStore();

        vi.spyOn(store, 'loadFromLocalStorage').mockImplementation(() => { });

        store.podcasts = [mockPodcast];

        const wrapper = mount(PodcastDetail, {
            global: {
                plugins: [router]
            }
        });

        const img = wrapper.find('img');
        expect(img.attributes('src')).toBe(mockPodcast.image);
        expect(img.attributes('alt')).toBe(mockPodcast.name);

        expect(wrapper.find('.title').text()).toBe(mockPodcast.name);
        expect(wrapper.find('.author span').text()).toBe(mockPodcast.artist);
        expect(wrapper.find('.description p').text()).toBe(mockPodcast.summary);
    });

    it('no debe renderizar nada si el podcast no se encuentra', () => {
        const store = usePodcastStore();
        vi.spyOn(store, 'loadFromLocalStorage').mockImplementation(() => { });

        store.podcasts = [];

        const wrapper = mount(PodcastDetail, {
            global: {
                plugins: [router]
            }
        });

        expect(wrapper.find('.podcast-card').exists()).toBe(false);
    });

    it('los enlaces deben apuntar a la ruta correcta del podcast', async () => {
        const store = usePodcastStore();
        vi.spyOn(store, 'loadFromLocalStorage').mockImplementation(() => { });
        store.podcasts = [mockPodcast];

        const wrapper = mount(PodcastDetail, {
            global: {
                plugins: [router]
            }
        });

        const links = wrapper.findAllComponents({ name: 'RouterLink' });

        links.forEach(link => {
            expect(link.props().to).toMatchObject({
                name: 'podcast',
                params: { podcastId: '123' }
            });
        });
    });
});
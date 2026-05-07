import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { usePodcastStore } from '../stores/usePodcastStore'
import { useEpisodeStore } from '../stores/useEpisodeStore'

describe('Store Data Integrity', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })
    it('almacena y expone los podcasts correctamente', async () => {
        const store = usePodcastStore()
        const mockPodcasts = [{ id: '1', name: 'Test Podcast' } as any]

        store.podcasts = mockPodcasts

        expect(store.podcasts).toHaveLength(1)
        expect(store.podcasts[0].name).toBe('Test Podcast')
    })

    it('almacena y expone los episodios correctamente', async () => {
        const store = useEpisodeStore()

        store.podcastCache = {
            '123': {
                episodes: [{ id: 'ep1', title: 'Test Episode' } as any],
                lastUpdated: Date.now()
            }
        }

        expect(store.podcastCache['123'].episodes).toHaveLength(1)
        expect(store.podcastCache['123'].episodes[0].title).toBe('Test Episode')
    })
})
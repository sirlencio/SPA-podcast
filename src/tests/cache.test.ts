// @vitest-environment happy-dom

import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { usePodcastStore } from '../stores/usePodcastStore'
import { useEpisodeStore } from '../stores/useEpisodeStore'

describe('Podcast Store - cache', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })
    it('hace fetch cuando la cache ha expirado en ambos stores', async () => {
        const podcastStore = usePodcastStore()
        const episodeStore = useEpisodeStore()

        const expiredTime = Date.now() - (25 * 60 * 60 * 1000)

        podcastStore.podcasts = [{ id: '1' } as any]
        podcastStore.lastUpdated = expiredTime

        episodeStore.podcastCache = {
            '123': {
                episodes: [{ id: 'ep1' } as any],
                lastUpdated: expiredTime
            }
        }

        const fetchMock = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    feed: { entry: [] },
                    results: []
                })
            } as Response)
        )

        vi.stubGlobal('fetch', fetchMock)

        await podcastStore.fetchTopPodcasts()
        await episodeStore.fetchEpisodes('123')

        expect(fetchMock).toHaveBeenCalledTimes(2)
    })

    it('no hace fetch si la cache es válida en ambos stores', async () => {
        const podcastStore = usePodcastStore()
        const episodeStore = useEpisodeStore()
        const now = Date.now()

        podcastStore.podcasts = [{ id: '1' } as any]
        podcastStore.lastUpdated = now

        episodeStore.podcastCache = {
            '123': {
                episodes: [{ id: 'ep1' } as any],
                lastUpdated: now
            }
        }

        const fetchMock = vi.fn()
        vi.stubGlobal('fetch', fetchMock)

        await podcastStore.fetchTopPodcasts()
        await episodeStore.fetchEpisodes('123')

        expect(fetchMock).not.toHaveBeenCalled()
    })
})
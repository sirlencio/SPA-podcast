import { describe, it, expect } from 'vitest'
import { filterPodcasts } from '../utils/filterPodcasts'

describe('filterPodcasts', () => {
    const mockData = [
        { id: '1', name: 'Podcast Test', artist: 'Miguel', image: "", summary: "placeholder" },
        { id: '2', name: 'Podcast Audio', artist: 'Paco', image: "", summary: "placeholder" }
    ]

    it('filtra por nombre', () => {
        expect(filterPodcasts(mockData, 'Test')).toHaveLength(1)
    })

    it('filtra por autor', () => {
        expect(filterPodcasts(mockData, 'Miguel')).toHaveLength(1)
    })

    it('no filtra si query vacía', () => {
        expect(filterPodcasts(mockData, '')).toHaveLength(2)
    })
})
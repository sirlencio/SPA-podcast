import type { Podcast } from "../types/Podcast"

export function filterPodcasts(podcasts: Podcast[], query: string): Podcast[] {
  const q = query.toLowerCase()

  return podcasts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.artist.toLowerCase().includes(q)
  )
}
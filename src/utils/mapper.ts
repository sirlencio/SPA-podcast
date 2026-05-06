import type { Episode, IEpisodeRaw } from "../types/Episode";
import type { IPodcastRaw, Podcast } from "../types/Podcast";

export const mapPodcasts = (rawEntries: IPodcastRaw[]): Podcast[] => {
    return rawEntries.map((entry) => ({
        id: entry.id.attributes['im:id'],
        name: entry['im:name'].label,
        artist: entry['im:artist'].label,
        image: entry['im:image'][2]?.label || entry['im:image'][0]?.label,
        summary: entry.summary.label
    }));
};

export const mapEpisodes = (rawResults: IEpisodeRaw[]): Episode[] => {
    return rawResults
        .filter(item => item.wrapperType === 'podcastEpisode')
        .map(item => ({
            id: item.trackId,
            title: item.trackName,
            audioUrl: item.episodeUrl || item.previewUrl || '',
            description: item.description || item.shortDescription || 'No description',
            date: new Date(item.releaseDate).toLocaleDateString(),
            duration: formatMsToTime(item.trackTimeMillis || 0)
        }));
};

const formatMsToTime = (ms: number): string => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));

    return [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
    ].join(':');
};
export interface Episode {
  id: string;
  title: string;
  audioUrl: string;
  description: string;
  date: string;
  duration: string;
}

export interface IEpisodeRaw {
  wrapperType: string;
  trackId: string;
  trackName: string;
  description?: string;
  shortDescription?: string;
  episodeUrl?: string;
  previewUrl?: string;
  releaseDate: string;
  trackTimeMillis?: number;
}

export interface IPodcastLookupResponse {
  resultCount: number;
  results: IEpisodeRaw[];
}
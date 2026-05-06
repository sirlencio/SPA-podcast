export interface Podcast {
  id: string;
  name: string;
  artist: string;
  image: string;
  summary: string;
}

export interface IPodcastRaw {
  id: { attributes: { 'im:id': string } };
  'im:name': { label: string };
  'im:artist': { label: string };
  'im:image': Array<{ label: string; attributes: { height: string } }>;
  summary: { label: string };
}

export interface ITopPodcastsResponse {
  feed: {
    entry: IPodcastRaw[];
  };
}
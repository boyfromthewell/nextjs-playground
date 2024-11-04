type ThumbnailsType = {
  url: string;
  width: number;
  height: number;
};

export type SnippetInfo = {
  categoryId: string;
  channelId: string;
  channelTitle: string;
  defaultAudioLanguage: string;
  defaultLanguage: string;
  description: string;
  liveBroadcastContent: string;
  localized: { description: string; title: string };
  publishedAt: string;
  tags: string[];
  thumbnails: {
    default: ThumbnailsType;
    high: ThumbnailsType;
    maxres: ThumbnailsType;
    medium: ThumbnailsType;
    standard: ThumbnailsType;
  };
  resourceId?: {
    kind: string;
    videoId: string;
  };
  title: string;
};

interface VideoItem {
  etag: string;
  id: string;
  kind: string;
  snippet: SnippetInfo;
}

export interface VideoInfo {
  id: string;
  items: VideoItem[];
  nextPageToken?: string;
}

export interface VideoDetail {
  title: string;
  description: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
}

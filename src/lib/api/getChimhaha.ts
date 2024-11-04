export async function getChimhahaPlaylist({
  nextPageToken = '',
  queryKey,
}: {
  nextPageToken: string;
  queryKey: string[];
}) {
  const [_1, _2, channelId] = queryKey;

  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&&channelId=${channelId}&maxResults=15&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`,
    {
      next: {
        tags: ['videos', 'chimhaha'],
      },
    },
  );

  const data = await res.json();
  return {
    id: data.etag,
    items: data.items,
    nextPageToken: data.nextPageToken,
  };
}

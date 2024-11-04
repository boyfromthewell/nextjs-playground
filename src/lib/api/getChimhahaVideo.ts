export async function getChimhahaVideoList({
  nextPageToken = '',
  queryKey,
}: {
  nextPageToken: string;
  queryKey: string[];
}) {
  const [_1, _2, playlistId] = queryKey;

  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`,
    {
      next: {
        tags: ['videos', 'chimhaha', playlistId],
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

export async function getPopularVideoList({
  nextPageToken = '',
  queryKey,
}: {
  nextPageToken: string;
  queryKey: string[];
}) {
  const [_1, _2, regionCode] = queryKey;

  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&regionCode=${regionCode}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`,
    {
      next: {
        tags: ['videos', 'popular', regionCode],
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

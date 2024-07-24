export async function getPopularVideoList({
  nextPageToken = '',
}: {
  nextPageToken?: string;
}) {
  console.log('next token', nextPageToken);
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&regionCode=KR&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`,
    {
      next: {
        tags: ['videos', 'popular'],
      },
    },
  );
  return res.json();
}

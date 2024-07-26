export async function getVideoDetail({ queryKey }: { queryKey: string[] }) {
  const [_1, id] = queryKey;

  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
    {
      next: {
        tags: ['video', id],
      },
      cache: 'no-store',
    },
  );

  const data = await res.json();
  const video = data.items[0];

  return {
    title: video.snippet.title,
    description: video.snippet.description,
    publishedAt: video.snippet.publishedAt,
    viewCount: video.statistics.viewCount,
    likeCount: video.statistics.likeCount,
    commentCount: video.statistics.commentCount,
  };
}

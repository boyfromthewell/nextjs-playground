export async function getVideoDetail({ queryKey }) {
  const [_1, id] = queryKey;
  console.log(queryKey);
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
    {
      next: {
        tags: ['video', id],
      },
      cache: 'no-store',
    },
  );
  return res.json();
}

import { getVideoDetail } from '@/lib/api/getVideoDetail';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import Comments from './_components/Comments';
import VideoSection from './_components/VideoSection';
import { getComment } from '@/lib/api/comment';

export default async function Video({ params }: { params: { id: string } }) {
  const { id } = params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['video', id],
      queryFn: getVideoDetail,
    }),
    queryClient.prefetchQuery({
      queryKey: ['comment', id],
      queryFn: getComment,
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<div>Loading...</div>}>
        <VideoSection id={id} />
        <Comments id={id} />
      </Suspense>
    </HydrationBoundary>
  );
}

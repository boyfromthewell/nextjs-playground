import { getVideoDetail } from '@/api/getVideoDetail';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import Comments from './_components/Comments';
import VideoSection from './_components/VideoSection';

export default async function Video({ params }: { params: { id: string } }) {
  const { id } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['video', id],
    queryFn: getVideoDetail,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<div>Loading...</div>}>
        <VideoSection id={id} />
        <Comments />
      </Suspense>
    </HydrationBoundary>
  );
}

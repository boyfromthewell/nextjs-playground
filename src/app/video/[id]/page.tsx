import { getVideoDetail } from '@/api/getVideoDetail';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import VideoInfo from './_components/VideoInfo';

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
      <VideoInfo id={id} />
    </HydrationBoundary>
  );
}

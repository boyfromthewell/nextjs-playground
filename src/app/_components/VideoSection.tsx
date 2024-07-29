import { getPopularVideoList } from '@/api/getPopularVideo';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import VideoInfo from './VideoInfo';
import { VideoInfo as Video } from '@/types/Video';

export default function VideoSection({ regionCode }: { regionCode: string }) {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    Video,
    object,
    InfiniteData<Video>,
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ['videos', 'popular', regionCode],
    queryFn: ({ queryKey, pageParam = '' }) =>
      getPopularVideoList({ nextPageToken: pageParam as string, queryKey }),
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });

  const { ref, inView } = useInView({ threshold: 0, delay: 0 });

  useEffect(() => {
    if (inView) !isFetching && hasNextPage && fetchNextPage();
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <>
      <Wrapper>
        {data?.pages.map((page) => (
          <Fragment key={page.id}>
            {page.items?.map((item) => (
              <VideoInfo key={item.etag} info={item} />
            ))}
          </Fragment>
        ))}
      </Wrapper>
      {!isFetching && (
        <div ref={ref} style={{ height: 50, backgroundColor: 'red' }} />
      )}
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 30px;
  padding: 0 40px;
`;

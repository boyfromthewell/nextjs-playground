'use client';

import { getChimhahaVideoList } from '@/lib/api/getChimhahaVideo';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { VideoInfo as Video } from '@/types/Video';
import { useInView } from 'react-intersection-observer';
import { Fragment, useEffect } from 'react';
import VideoInfo from '@/app/_components/VideoInfo';

export default function ChimhahaVideolist({ id }: { id: string }) {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    Video,
    object,
    InfiniteData<Video>,
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ['videos', 'chimhaha', id],
    queryFn: ({ queryKey, pageParam = '' }) =>
      getChimhahaVideoList({ nextPageToken: pageParam as string, queryKey }),
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
              <VideoInfo key={item.etag} info={item} type="CHIMHAHA" />
            ))}
          </Fragment>
        ))}
      </Wrapper>
      {!isFetching && <div ref={ref} style={{ height: 10 }} />}
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

  @media (max-width: 575px) {
    padding: 0px 12px;
  }
`;

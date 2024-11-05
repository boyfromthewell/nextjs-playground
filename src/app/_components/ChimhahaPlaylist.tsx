'use client';
import { getChimhahaPlaylist } from '@/lib/api/getChimhaha';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import PlaylistInfo from '../chimhaha/_components/PlaylistInfo';

export default function Chimhaha({ channelId }: { channelId: string }) {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['videos', 'chimhaha', channelId],
    queryFn: ({ queryKey, pageParam = '' }) =>
      getChimhahaPlaylist({ nextPageToken: pageParam as string, queryKey }),
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
            {page.items?.map((item: any) => (
              <PlaylistInfo key={item.etag} info={item} />
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

import { getPopularVideoList } from '@/api/getPopularVideo';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import VideoInfo from './VideoInfo';

export default function VideoSection() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['videos', 'popular'],
    queryFn: ({ pageParam = '' }) =>
      getPopularVideoList({ nextPageToken: pageParam }),
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });

  console.log(data);

  const { ref, inView } = useInView({ threshold: 0, delay: 0 });

  useEffect(() => {
    if (inView) !isFetching && hasNextPage && fetchNextPage();
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <>
      <Wrapper>
        {data?.pages.map((page) => (
          <Fragment key={page.etag}>
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
  padding: 40px;
`;

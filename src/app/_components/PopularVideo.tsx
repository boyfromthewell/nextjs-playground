import { getPopularVideoList } from '@/api/getPopularVideo';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

export default function PopularVideo() {
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
          <>
            {page.items?.map((item) => (
              <Box>
                <Image
                  priority
                  src={item.snippet.thumbnails.standard.url}
                  alt="썸네일 이미지"
                  width={300}
                  height={200}
                />
                {item.snippet.title}
              </Box>
            ))}
          </>
        ))}
      </Wrapper>
      {!isFetching && <div ref={ref} style={{ height: 50 }} />}
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  gap: 30px;
`;

const Box = styled.div`
  width: 400px;
  height: 400px;
`;

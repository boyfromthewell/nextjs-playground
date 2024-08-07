'use client';

import { getComment } from '@/api/comment';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

export default function CommentList({ videoId }: { videoId: string }) {
  const { data } = useQuery({
    queryKey: ['comment', videoId],
    queryFn: getComment,
    refetchOnMount: true,
    refetchInterval: 30000,
  });

  console.log(data);

  return (
    <>
      {data?.comments.map(({ userId, content, createdAt }) => (
        <CommentWrapper>
          {userId}
          {content}
          {createdAt}
        </CommentWrapper>
      ))}
    </>
  );
}

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 120px;
`;

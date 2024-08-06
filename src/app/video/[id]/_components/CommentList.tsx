import { getComment } from '@/api/comment';
import { useEffect } from 'react';
import styled from 'styled-components';

export default function CommentList({ videoId }: { videoId: string }) {
  useEffect(() => {
    const fetchComment = async () => {
      const res = await getComment(videoId);
      console.log(res);
    };
    fetchComment();
  }, []);
  return <ListContainer>fdfd</ListContainer>;
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

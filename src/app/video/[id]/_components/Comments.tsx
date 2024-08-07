'use client';

import styled from 'styled-components';
import CommentForm from './CommentForm';
import { ChangeEvent, useState } from 'react';
import { postComment } from '@/api/comment';
import { useSession } from 'next-auth/react';
import CommentList from './CommentList';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function Comments({ id }: { id: string }) {
  const [textValue, setTextValue] = useState('');
  const { data } = useSession();
  const videoId = typeof id === 'string' ? id : '';

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setTextValue(e.target.value);

  const resetText = () => setTextValue('');
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const isSuccess = await postComment(
        {
          videoId,
          userId: data?.user.email || (data?.user.name as string),
          content: textValue,
        },
        data?.user.accessToken as string,
      );
      if (isSuccess) resetText();
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['comment', videoId] });
    },
  });

  const sendComment = () => {
    mutate();
  };

  return (
    <CommentsContainer>
      <CommentForm
        value={textValue}
        onChange={onChange}
        resetText={resetText}
        sendComment={sendComment}
      />
      <ListContainer>
        <CommentList videoId={videoId} />
      </ListContainer>
    </CommentsContainer>
  );
}

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  width: 30%;
  height: auto;
  background-color: lightblue;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

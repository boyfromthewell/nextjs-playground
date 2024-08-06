'use client';

import styled from 'styled-components';
import CommentForm from './CommentForm';
import { ChangeEvent, useState } from 'react';
import { useParams } from 'next/navigation';
import { postComment } from '@/api/comment';
import { useSession } from 'next-auth/react';
import CommentList from './CommentList';

export default function Comments() {
  const [textValue, setTextValue] = useState('');
  const { data } = useSession();
  const { id } = useParams();
  const videoId = typeof id === 'string' ? id : '';

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setTextValue(e.target.value);

  const resetText = () => setTextValue('');

  const sendComment = async () => {
    const isSuccess = await postComment(
      {
        videoId,
        userId: data?.user.email || (data?.user.name as string),
        content: textValue,
      },
      data?.user.accessToken as string,
    );
    if (isSuccess) resetText();
  };

  return (
    <CommentsContainer>
      <CommentForm
        value={textValue}
        onChange={onChange}
        resetText={resetText}
        sendComment={sendComment}
      />
      <CommentList videoId={videoId} />
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

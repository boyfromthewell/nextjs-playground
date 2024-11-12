'use client';

import { getComment } from '@/lib/api/comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import LikeIcon from '../../../../../public/like.svg';
import DislikeIcon from '../../../../../public/dislike.svg';
import { useSession } from 'next-auth/react';

export default function CommentList({ videoId }: { videoId: string }) {
  const { data } = useQuery({
    queryKey: ['comment', videoId],
    queryFn: getComment,
    refetchOnMount: true,
    refetchInterval: 30000,
  });

  const queryClient = useQueryClient();
  const { data: user } = useSession();

  const controllBtnDisabled = (provider: string, userId: string) => {
    switch (provider) {
      case 'google':
        if (userId === user?.user.email) return true;
        else return false;

      case 'kakao':
        if (userId === user?.user.name) return true;
        else return false;

      case 'naver':
        if (userId === user?.user.name) return true;
        else return false;
    }
  };

  const { mutate } = useMutation({
    mutationFn: async (variables: {
      commentId: number;
      action: 'like' | 'dislike';
    }) => {
      const response = await fetch(`/api/comment/${variables.commentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: variables.action }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    },
    onMutate: async (variables) => {
      const previousData = queryClient.getQueryData(['comment', videoId]);

      queryClient.setQueryData(['comment', videoId], (oldData: any) => ({
        ...oldData,
        comments: oldData.comments.map((comment: any) =>
          comment.id === variables.commentId
            ? {
                ...comment,
                like:
                  variables.action === 'like' ? comment.like + 1 : comment.like,
                disLike:
                  variables.action === 'dislike'
                    ? comment.disLike + 1
                    : comment.disLike,
              }
            : comment,
        ),
      }));

      return { previousData };
    },
  });

  const handleClickLike = (commentId: number) => {
    mutate({ commentId, action: 'like' });
  };

  const handleClickDislike = (commentId: number) => {
    mutate({ commentId, action: 'dislike' });
  };

  return (
    <CommentWrapper>
      {data?.comments.map(
        ({ id, userId, content, createdAt, like, disLike }: any) => (
          <CommentBox key={`${id}${content}`}>
            <NameAndDate>
              <UserName>{userId}</UserName> <Date>{createdAt}</Date>
            </NameAndDate>
            <Text>{content}</Text>
            <ButtonWrapper>
              <LikeBtn
                disabled={controllBtnDisabled(
                  user?.user.provider as string,
                  userId,
                )}
                onClick={() => handleClickLike(id)}
              >
                <LikeIcon />
                {like}
              </LikeBtn>
              <DislikeBtn
                disabled={controllBtnDisabled(
                  user?.user.provider as string,
                  userId,
                )}
                onClick={() => handleClickDislike(id)}
              >
                <DislikeIcon />
                {disLike}
              </DislikeBtn>
            </ButtonWrapper>
          </CommentBox>
        ),
      )}
    </CommentWrapper>
  );
}

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: max-content;
  overflow-y: auto;
  margin-top: 18px;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 120px;
  border-radius: 12px;
  border: 1px solid lightgray;
  padding: 12px;
`;

const NameAndDate = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const UserName = styled.span`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.8rem;
  color: #0f0f0f;
`;

const Date = styled.span`
  font-size: 0.8rem;
  line-height: 1.8rem;
  font-weight: 400;
  color: #606060;
`;

const Text = styled.p`
  color: #0f0f0f;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

const LikeBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: fit-content;
  height: 42px;
  border-radius: 8px;
  border: none;
  padding: 6px;
  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: lightgray;
  }
`;

const DislikeBtn = styled(LikeBtn)``;

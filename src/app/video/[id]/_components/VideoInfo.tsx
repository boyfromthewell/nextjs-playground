import { dateStrToKorStr } from '@/lib/date';
import { VideoDetail } from '@/types/Video';
import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

export default function VideoInfo({ info }: { info: VideoDetail }) {
  const {
    title,
    description,
    publishedAt,
    viewCount,
    likeCount,
    commentCount,
  } = info;

  const [prevCount, setPrevCount] = useState({
    likeCount,
    viewCount,
    commentCount,
  });

  const [isAnimating, setIsAnimating] = useState({
    likeCount: false,
    viewCount: false,
    commentCount: false,
  });

  useEffect(() => {
    const detectNewValue = {
      likeCount: likeCount !== prevCount.likeCount,
      viewCount: viewCount !== prevCount.viewCount,
      commentCount: commentCount !== prevCount.commentCount,
    };

    setIsAnimating(detectNewValue);
    setPrevCount({ likeCount, viewCount, commentCount });

    const timeout = setTimeout(() => {
      setIsAnimating({
        likeCount: false,
        viewCount: false,
        commentCount: false,
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [likeCount, viewCount, commentCount]);

  return (
    <InfoWrapper>
      <h2>{title}</h2>
      <Description>
        <ViewCountDate>
          <ViewCount $isHightlight={isAnimating.viewCount}>
            조회수 {viewCount}
          </ViewCount>{' '}
          / {dateStrToKorStr(publishedAt)}
        </ViewCountDate>
        <CommentLikeCount>
          <LikeCount $isHightlight={isAnimating.likeCount}>
            좋아요 {likeCount}
          </LikeCount>{' '}
          /
          <CommentCount $isHightlight={isAnimating.commentCount}>
            댓글 {commentCount}
          </CommentCount>
        </CommentLikeCount>
        <ScrollableDescription>{description}</ScrollableDescription>
      </Description>
    </InfoWrapper>
  );
}

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;

  height: 35%;
  line-height: 24px;
  h2 {
    font-weight: 600;
    font-size: 27px;
  }

  @media (max-width: 991px) {
    h2 {
      font-size: 1.25rem;
      line-height: 24px;
    }
  }
`;

const blinkAnimation = keyframes`
  0%, 100% { color: #0f0f0f; }
  50% { color: #6baed6; } 
`;

const ViewCount = styled.p<{ $isHightlight: boolean }>`
  ${({ $isHightlight }) =>
    $isHightlight &&
    css`
      animation: ${blinkAnimation} 0.5s ease-in-out;
    `}
  font-weight: 600;
  color: #0f0f0f;
`;

const CommentCount = styled(ViewCount)``;

const LikeCount = styled(ViewCount)``;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  margin-top: 20px;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 12px;
  max-height: 180px;
`;

const ViewCountDate = styled.div`
  display: flex;
  gap: 7px;
  margin-bottom: 12px;
  p {
    color: #0f0f0f;
    font-weight: 600;
  }

  @media (max-width: 991px) {
    p {
      font-size: 1rem;
    }
  }
`;

const CommentLikeCount = styled(ViewCountDate)`
  @media (max-width: 991px) {
    font-size: 0.925rem;
  }
`;

const ScrollableDescription = styled.span`
  overflow-y: auto;
  max-height: 100%;
  padding-right: 8px;
  white-space: pre-wrap;
  @media (max-width: 991px) {
    border-top: 1px solid black;
    padding-top: 8px;
    font-size: 0.9rem;
  }
`;

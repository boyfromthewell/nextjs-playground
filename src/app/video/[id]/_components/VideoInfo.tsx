import { VideoDetail } from '@/types/Video';
import styled from 'styled-components';

export default function VideoInfo({ info }: { info: VideoDetail }) {
  const {
    title,
    description,
    publishedAt,
    viewCount,
    likeCount,
    commentCount,
  } = info;

  return (
    <InfoWrapper>
      <h2>{title}</h2>
      <Description>
        <ViewCountDate>
          조회수 <p>{viewCount}</p> <p>{publishedAt}</p>
        </ViewCountDate>
        <CommentLikeCount>
          좋아요 <p>{likeCount}</p> 댓글 <p>{commentCount}</p>
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
  h2 {
    font-weight: 600;
    font-size: 27px;
  }

  @media (max-width: 575px) {
    h2 {
      font-size: 1.25rem;
      line-height: 24px;
    }
  }
`;

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

  @media (max-width: 575px) {
    p {
      font-size: 1rem;
    }
  }
`;

const CommentLikeCount = styled(ViewCountDate)`
  @media (max-width: 575px) {
    font-size: 0.925rem;
  }
`;

const ScrollableDescription = styled.span`
  overflow-y: auto;
  max-height: 100%;
  padding-right: 8px;
  white-space: pre-wrap;
  @media (max-width: 575px) {
    border-top: 1px solid black;
    padding-top: 8px;
    font-size: 0.9rem;
  }
`;

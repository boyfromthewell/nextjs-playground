import Image from 'next/image';
import styled from 'styled-components';
import GotoChannelBtn from './GotoChannelBtn';
import Link from 'next/link';
import { SnippetInfo } from '@/types/Video';
import { dateStrToKorStr } from '@/lib/date';

interface VideoInfoProps {
  info: {
    etag: string;
    id: string;
    kind: string;
    snippet: SnippetInfo;
  };
  type: 'COMMON' | 'CHIMHAHA';
}

export default function VideoInfo({ info, type }: VideoInfoProps) {
  return (
    <VideoInfoContainer>
      <Link
        href={
          type === 'COMMON'
            ? `/video/${info.id}`
            : `/video/${info.snippet.resourceId?.videoId}`
        }
      >
        <Image
          priority
          src={info.snippet.thumbnails.standard?.url || ''}
          alt="썸네일 이미지"
          width={480}
          height={360}
          style={{ borderRadius: 8 }}
        />
        <Infos>
          {type === 'COMMON' && (
            <GotoChannelBtn
              channel={info.snippet.channelTitle}
              id={info.snippet.channelId}
            />
          )}

          <Title>{info.snippet.title}</Title>

          <Tags>
            {info.snippet.tags
              ?.slice(0, 6)
              .map((text) => <Tag key={text}>#{text}</Tag>)}
          </Tags>
          <Published>{dateStrToKorStr(info.snippet.publishedAt)}</Published>
        </Infos>
      </Link>
    </VideoInfoContainer>
  );
}

const VideoInfoContainer = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px;
  width: 100%;
  line-height: 24px;

  @media (max-width: 575px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0;
    img {
      width: 100%;
      object-fit: cover;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0;
    img {
      width: 100%;
      object-fit: cover;
    }
  }

  @media (min-width: 576px) and (max-width: 767px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Title = styled.h2`
  word-break: break-all;
  font-size: 24px;
  font-weight: 600;
  line-height: 36px;
  background-color: #fafafa;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid lightgray;
  margin-top: 12px;

  @media (max-width: 575px) {
    word-break: break-all;
    white-space: pre-wrap;
    width: 100%;
    font-size: 1.2rem;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    word-break: break-all;
    white-space: pre-wrap;
    width: 100%;
    font-size: 1.2rem;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    word-break: break-all;
    white-space: pre-wrap;
    width: 100%;
    font-size: 1.2rem;
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.p`
  background-color: #82caff;
  border-radius: 12px;
  width: fit-content;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  font-size: 14px;
  color: #fff;
  font-weight: 600;
  @media (max-width: 575px) {
    font-size: 0.925rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 0.925rem;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 0.925rem;
  }
`;

const Published = styled.p`
  margin-left: auto;
  @media (max-width: 575px) {
    font-size: 0.8rem;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 0.8rem;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 0.8rem;
  }
`;

import Image from 'next/image';
import styled from 'styled-components';
import GotoChannelBtn from './GotoChannelBtn';
import Link from 'next/link';

export default function VideoInfo({ info }) {
  return (
    <VideoInfoContainer>
      {' '}
      <Image
        priority
        src={info.snippet.thumbnails.standard.url}
        alt="썸네일 이미지"
        width={480}
        height={360}
      />
      <Infos>
        <GotoChannelBtn
          channel={info.snippet.channelTitle}
          id={info.snippet.channelId}
        />
        <Link href={`/video/${info.id}`}>
          <Title>{info.snippet.title}</Title>
        </Link>
        <Tags>
          {info.snippet.tags
            ?.slice(0, 6)
            .map((text) => <Tag key={text}>#{text}</Tag>)}
        </Tags>
        <Published>{info.snippet.publishedAt}</Published>
      </Infos>
    </VideoInfoContainer>
  );
}

const VideoInfoContainer = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px;
  width: 100%;
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
`;

const Description = styled.p`
  background-color: lightgray;
  white-space: pre-wrap;
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
`;

const Published = styled.p``;

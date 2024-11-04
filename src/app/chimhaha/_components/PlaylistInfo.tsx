import { dateStrToKorStr } from '@/lib/date';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

export default function PlaylistInfo({ info }: { info: any }) {
  return (
    <PlaylistInfoContainer>
      <Image
        priority
        src={
          info.snippet.thumbnails.standard?.url ||
          info.snippet.thumbnails.high?.url ||
          ''
        }
        alt="썸네일 이미지"
        width={480}
        height={360}
        style={{ borderRadius: 8 }}
      />
      <InfoContainer>
        <Link href={`/chimhaha/${info.id}`}>
          <h2>{info.snippet.title}</h2>
        </Link>
        <p>{info.snippet.description}</p>
        <span>{dateStrToKorStr(info.snippet.publishedAt)}</span>
      </InfoContainer>
    </PlaylistInfoContainer>
  );
}

const PlaylistInfoContainer = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px;
  width: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  width: 100%;

  h2 {
    font-size: 32px;
  }
  p {
    font-size: 20px;
    color: gray;
  }

  span {
    margin-left: auto;
  }
`;

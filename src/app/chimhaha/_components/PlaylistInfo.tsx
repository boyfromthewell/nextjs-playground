import { dateStrToKorStr } from '@/lib/date';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

export default function PlaylistInfo({ info }: { info: any }) {
  return (
    <PlaylistInfoContainer>
      <Link href={`/chimhaha/${info.id}`}>
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
          <h2>{info.snippet.title}</h2>

          <p>{info.snippet.description}</p>
          <span>{dateStrToKorStr(info.snippet.publishedAt)}</span>
        </InfoContainer>
      </Link>
    </PlaylistInfoContainer>
  );
}

const PlaylistInfoContainer = styled.div`
  display: flex;
  padding: 24px;
  width: 100%;

  a {
    width: inherit;
    display: flex;
    gap: 24px;
  }
  @media (max-width: 991px) {
    padding: 0;
    a {
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
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  width: 100%;

  h2 {
    font-size: 1.8rem;
    margin: 12px 0;
    padding-bottom: 8px;
    border-bottom: 2px solid #ddd;
    color: #333;
    line-height: 1.4;
    word-break: keep-all;
    margin-top: 12px;
  }
  p {
    font-size: 20px;
    color: gray;
  }

  span {
    margin-left: auto;
  }

  @media (max-width: 991px) {
    p {
      font-size: 1rem;
    }
  }
`;

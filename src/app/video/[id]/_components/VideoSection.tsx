'use client';

import { getVideoDetail } from '@/lib/api/getVideoDetail';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import styled from 'styled-components';
import VideoInfo from './VideoInfo';
import { VideoDetail } from '@/types/Video';

export default function VideoSection({ id }: { id: string }) {
  const [isWindow, setIsWindow] = useState(false);

  const { data } = useQuery<VideoDetail>({
    queryKey: ['video', id],
    queryFn: getVideoDetail,
    staleTime: 0,
    refetchOnMount: true,
    refetchInterval: 3000, // refetch 10초 (좋아요 실시간 변동 보임)
  });

  useEffect(() => {
    setIsWindow(true);
  }, []);

  return (
    <VideoInfoSection>
      <VideoWrapper>
        {isWindow && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            width="100%"
            height="100%"
            controls
          />
        )}
      </VideoWrapper>
      {data && <VideoInfo info={data} />}
    </VideoInfoSection>
  );
}

const VideoInfoSection = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: 60%;
  padding: 18px;
  background-color: black;
  @media (max-width: 575px) {
    width: 100%;
    height: 360px;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    height: 440px;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    height: 520px;
  }
`;

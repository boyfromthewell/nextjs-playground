'use client';

import { getVideoDetail } from '@/api/getVideoDetail';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import styled from 'styled-components';
import VideoInfo from './VideoInfo';

export default function VideoSection({ id }) {
  const [isWindow, setIsWindow] = useState(false);

  const { data } = useQuery({
    queryKey: ['video', id],
    queryFn: getVideoDetail,
    staleTime: 0,
    refetchOnMount: true,
    refetchInterval: 10000, // refetch 10초 (좋아요 실시간 변동 보임)
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
      <VideoInfo info={data} />
    </VideoInfoSection>
  );
}

const VideoInfoSection = styled.div`
  width: 70%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: 65%;
  padding: 18px;
  background-color: black;
`;

const Info = styled.div`
  display: flex;
  width: 100%;
  height: max-content;
  background-color: gray;
`;

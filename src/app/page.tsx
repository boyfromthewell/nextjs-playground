'use client';

import styled from 'styled-components';
import VideoSection from './_components/VideoSection';

export default function Home() {
  return (
    <PageWrapper>
      <VideoSection />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

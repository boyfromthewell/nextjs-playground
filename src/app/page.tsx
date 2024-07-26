'use client';

import styled from 'styled-components';
import VideoSection from './_components/VideoSection';
import FlagIcons from './_components/FlagIcons';
import { useState } from 'react';

export default function Home() {
  const [regionCode, setRegionCode] = useState('KR');

  const onClickFlag = (code: string) => setRegionCode(code);

  return (
    <PageWrapper>
      <FlagIcons onClick={onClickFlag} selectCode={regionCode} />
      <VideoSection regionCode={regionCode} />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

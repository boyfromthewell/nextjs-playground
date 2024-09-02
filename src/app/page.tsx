'use client';

import styled from 'styled-components';
import VideoSection from './_components/VideoSection';
import FlagIcons from './_components/FlagIcons';
import { selectedCountryStore } from '@/store';

export default function Home() {
  const { selectedCountry, setSelectedCountry } = selectedCountryStore();

  const onClickFlag = (code: string) => setSelectedCountry(code);

  return (
    <PageWrapper>
      <FlagIcons onClick={onClickFlag} selectCode={selectedCountry} />
      <VideoSection regionCode={selectedCountry} />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

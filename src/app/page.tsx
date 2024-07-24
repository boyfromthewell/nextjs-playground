'use client';

import styled from 'styled-components';
import PopularVideo from './_components/PopularVideo';

export default function Home() {
  return (
    <MainContainer>
      <PopularVideo />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

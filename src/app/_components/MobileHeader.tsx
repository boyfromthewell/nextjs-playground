'use client';

import styled from 'styled-components';
import BurgerIcon from '../../../public/burger.svg';
import { useState } from 'react';
import MobileMenu from './MobileMenu';

export default function MobileHeader() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <>
      <Wrapper>
        <BurgerBtn onClick={() => setIsOpenMenu(true)}>
          <BurgerIcon />
        </BurgerBtn>
      </Wrapper>
      {isOpenMenu && <MobileMenu onClose={() => setIsOpenMenu(false)} />}
    </>
  );
}

const Wrapper = styled.div`
  @media (max-width: 575px) {
    width: 100%;
    height: 52px;
    margin-bottom: 12px;
    display: flex;
    justify-content: flex-end;
  }
  @media (min-width: 576px) {
    display: none;
  }
`;

const BurgerBtn = styled.button`
  width: 52px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border: none;

  svg {
    width: inherit;
    height: inherit;
  }
`;

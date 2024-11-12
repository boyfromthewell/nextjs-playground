'use client';

import styled from 'styled-components';
import BurgerIcon from '../../../public/burger.svg';
import { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';
import { usePathname } from 'next/navigation';

export default function MobileHeader() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    setCurrentPath(pathname);
    setIsOpenMenu(false);
  }, [pathname]);

  return (
    <>
      <Wrapper>
        <BurgerBtn onClick={() => setIsOpenMenu(true)}>
          <BurgerIcon />
        </BurgerBtn>
      </Wrapper>
      {isOpenMenu && (
        <MobileMenu
          onClose={() => setIsOpenMenu(false)}
          currentPath={currentPath}
        />
      )}
    </>
  );
}

const Wrapper = styled.div`
  @media (max-width: 575px) {
    width: 100%;
    height: 64px;
    margin-bottom: 12px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 12px;
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
  border: none;

  svg {
    width: inherit;
    height: inherit;
  }
`;

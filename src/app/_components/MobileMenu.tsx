import useDisableBodyScroll from '@/lib/useDisabledBodyScroll';
import styled from 'styled-components';
import CloseIcon from '../../../public/close.svg';
import LoginButton from './LoginButton';

import ThumbIcon from '../../../public/thumb.png';
import Chim from '../../../public/chimhaha.jpg';
import ChimPlus from '../../../public/chimhaha_plus.jpg';
import ChimOrigin from '../../../public/chim_live.jpg';
import Link from 'next/link';
import Image from 'next/image';

export default function MobileMenu({
  onClose,
  currentPath,
}: {
  onClose: () => void;
  currentPath: string;
}) {
  useDisableBodyScroll();

  const MENU_DATA = [
    {
      src: ThumbIcon,
      text: '인기 동영상',
      href: '/',
    },
    {
      src: Chim,
      text: '침하하',
      href: '/chimhaha',
    },
    {
      src: ChimPlus,
      text: '침하하 뒷고기',
      href: '/chimhahaPlus',
    },
    {
      src: ChimOrigin,
      text: '침하하 원본 박물관',
      href: '/chimhahaOrigin',
    },
  ];

  return (
    <Wrapper>
      <BtnWrapper>
        <CloseBtn onClick={onClose}>
          <CloseIcon />
        </CloseBtn>
      </BtnWrapper>
      <MenuWrapper>
        {MENU_DATA.map(({ src, text, href }) => (
          <Menu key={text} $isActive={currentPath === href}>
            <Link href={href}>
              {src && <Image src={src} width="50" height="50" alt={text} />}
              {text}
            </Link>
          </Menu>
        ))}
      </MenuWrapper>
      <LoginButton />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100dvh;
  z-index: 9876;
  background-color: #fff;
  overflow: hidden;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 64px;
  padding: 24px 12px 0 12px;
`;

const CloseBtn = styled.button`
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

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  height: auto;
`;

const Menu = styled.nav<{ $isActive: boolean }>`
  display: flex;
  width: 80%;
  height: 100px;
  border-bottom: 1px solid #0f0f0f;

  cursor: pointer;
  font-size: 1.25rem;
  a {
    padding: 8px;
    display: flex;
    align-items: center;
    font-weight: ${(props) => props.$isActive && 600};
  }

  img {
    margin-right: 12px;
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
`;

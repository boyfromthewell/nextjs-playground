'use client';
import Link from 'next/link';
import styled from 'styled-components';
import LoginButton from './LoginButton';
import Chim from '../../../public/chimhaha.jpg';
import ChimPlus from '../../../public/chimhaha_plus.jpg';
import ChimOrigin from '../../../public/chim_live.jpg';
import Image from 'next/image';

export default function Header() {
  return (
    <Wrapper>
      <Title>
        <LoginButton />
      </Title>
      <NavWrapper>
        <nav>
          <Link href="/">인기 동영상</Link>
        </nav>
        <nav>
          <Link href="/chimhaha">
            <Image src={Chim} alt="logo" width="30" height="30" />
            침하하
          </Link>
        </nav>
        <nav>
          <Link href="/chimhahaPlus">
            <Image src={ChimPlus} alt="logo" width="30" height="30" />
            침하하 뒷고기
          </Link>
        </nav>
        <nav>
          <Link href="/chimhahaOrigin">
            <Image src={ChimOrigin} alt="logo" width="30" height="30" />
            침하하 원본 박물관
          </Link>
        </nav>
      </NavWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  width: 100%;
  padding: 20px 0;
  background-color: #f8f9fa;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin-bottom: 22px;

  @media (max-width: 575px) {
    padding: 20px 8px;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #333;
  font-weight: 700;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 1200px;
`;

const NavWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);

  nav {
    width: 24%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background-color: #e9ecef;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    a {
      font-size: 1rem;
      color: #495057;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
    }

    img {
      margin-right: 8px;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }
  }

  @media (max-width: 575px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: 30%;

    nav {
      width: 100%;
      height: 44px;
      padding: 12px;
    }
  }
`;

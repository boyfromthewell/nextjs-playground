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
  height: 130px;
  display: flex;
  padding: 12px 24px 0 24px;
  background-color: #fff;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 32px;
  height: 50%;
  display: flex;
  justify-content: flex-end;
`;

const NavWrapper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  nav {
    border-radius: 8px 8px 0 0;
    border: 1px solid gray;
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      margin-right: 2px;
      border-radius: 50%;
    }
  }
`;

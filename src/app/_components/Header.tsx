'use client';
import Link from 'next/link';
import styled from 'styled-components';
import LoginButton from './LoginButton';

export default function Header() {
  return (
    <Wrapper>
      <Title>
        Title <LoginButton />
      </Title>
      <NavWrapper>
        <nav>
          <Link href="/">인기 동영상</Link>
        </nav>
        <nav>
          <Link href="/chimhaha">침하하</Link>
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
  justify-content: space-between;
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
      font-size: 24px;
    }
  }
`;

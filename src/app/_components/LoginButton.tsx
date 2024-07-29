import Link from 'next/link';
import styled from 'styled-components';

export default function LoginButton() {
  return (
    <Wrapper>
      <LoginSignup>
        <Link href="/login">
          <Button>로그인</Button>
        </Link>
        <Link href="/signup">
          <p>회원가입</p>
        </Link>
      </LoginSignup>
      <span>더 많은 즐거움을 누려보세요!</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-direction: column;
  span {
    font-size: 12px;
  }
  p {
    text-decoration: underline;
    font-size: 14px;
    cursor: pointer;
  }
`;

const LoginSignup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Button = styled.button`
  width: fit-content;
  height: 42px;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

export default function LoginButton() {
  const { data } = useSession();

  return (
    <Wrapper>
      {!data ? (
        <>
          <LoginSignup>
            <Link href="/login">
              <Button>로그인</Button>
            </Link>
            <Link href="/signup">
              <p>회원가입</p>
            </Link>
          </LoginSignup>
          <span>더 많은 즐거움을 누려보세요!</span>
        </>
      ) : (
        <Info>
          {data.user && (
            <UsernameAndImage>
              <Image
                src={data.user.image as string}
                width="35"
                height="35"
                alt="user profile"
              />
              <Name>{data.user.email} 님</Name>
            </UsernameAndImage>
          )}

          <Button onClick={() => signOut({ redirect: false })}>로그아웃</Button>
        </Info>
      )}
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
`;

const LoginSignup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  p {
    text-decoration: underline;
    font-size: 14px;
    cursor: pointer;
  }
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

const Info = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;

const UsernameAndImage = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  img {
    border-radius: 50%;
  }
`;

const Name = styled.p`
  font-size: 17px;
  font-weight: 500;
`;

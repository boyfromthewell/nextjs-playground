'use client';
import { signIn, useSession } from 'next-auth/react';
import Modal from './Modal';
import styled from 'styled-components';

export default function LoginModal() {
  const googleLogin = async () => {
    await signIn('google');
  };

  const kakaoLogin = async () => {
    await signIn('kakao');
  };

  const naverLogin = async () => {
    await signIn('naver');
  };

  return (
    <Modal>
      <Wrapper>
        <LoginForm>
          <label htmlFor="id">아이디</label>
          <input id="id" />

          <label htmlFor="pw">비밀번호</label>
          <input id="pw" />
        </LoginForm>

        <EasyLogin>
          <Divider>간편 로그인</Divider>
          <ButtonWrapper>
            <EasyLoginBtn onClick={googleLogin}>구글 로그인</EasyLoginBtn>
            <EasyLoginBtn onClick={kakaoLogin}> 카카오 로그인</EasyLoginBtn>
            <EasyLoginBtn onClick={naverLogin}>네이버 로그인</EasyLoginBtn>
          </ButtonWrapper>
        </EasyLogin>
      </Wrapper>
    </Modal>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  justify-content: space-between;
  height: 100%;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 8px;
    font-size: 22px;
  }

  input {
    margin-bottom: 30px;
    height: 42px;
  }
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid gray;
  padding-bottom: 12px;
  margin-bottom: 12px;
  text-align: center;
  font-size: 22px;
`;

const EasyLogin = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EasyLoginBtn = styled.button`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-weight: 600;
  border-radius: 8px;
`;

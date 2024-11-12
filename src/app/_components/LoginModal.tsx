'use client';
import { signIn, SignInResponse, useSession } from 'next-auth/react';
import Modal from './Modal';
import styled from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ErrorMessage from './ErrorMessage';

export default function LoginModal() {
  const router = useRouter();

  const [errorState, setErrorState] = useState({
    isError: false,
    message: '',
  });

  const [inputValue, setInputValue] = useState({
    id: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };
  const googleLogin = async () => {
    await signIn('google');
  };

  const kakaoLogin = async () => {
    await signIn('kakao');
  };

  const naverLogin = async () => {
    await signIn('naver');
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      id: inputValue.id,
      password: inputValue.password,
      redirect: false,
    });
    if (res!.ok) router.back();
    else {
      setErrorState({
        isError: true,
        message: '아이디/비밀번호를 확인해주세요.',
      });
    }
  };

  return (
    <Modal>
      <Wrapper>
        <LoginForm onSubmit={onSubmit}>
          <label htmlFor="id">아이디</label>
          <input
            id="id"
            type="text"
            onChange={onChange}
            value={inputValue.id}
          />
          <LabelContainer>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              onChange={onChange}
              value={inputValue.password}
            />
            <ErrorMessage message={errorState.message} />
          </LabelContainer>
          <Button>로그인</Button>
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

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 8px;
    font-size: 0.925rem;
    color: #333;
  }

  input {
    margin-bottom: 28px;
    height: 42px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 54px;
  padding: 0 16px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  border: none;
  color: #fff;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  @media (max-width: 575px) {
    height: 44px;
    font-size: 1.15rem;
    padding: 0 12px;
  }

  margin-bottom: 28px;
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid gray;
  padding-bottom: 12px;
  margin-bottom: 12px;
  text-align: center;
  font-size: 1rem;
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
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  color: #333;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e6e6e6;
  }

  img {
    margin-right: 8px;
  }
`;

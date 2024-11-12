'use client';
import styled from 'styled-components';
import Modal from './Modal';
import React, { useEffect, useState } from 'react';
import ErrorMessage from './ErrorMessage';
import { useRouter } from 'next/navigation';

export default function SignupModal() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState({
    id: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const [errorState, setErrorState] = useState({
    alreadyUsedName: false,
    confirmPassword: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    alreadyUsedName: '',
    confirmPassword: '',
  });

  const validatePasswords = () => {
    const passwordMatch = inputValue.password === inputValue.confirmPassword;
    setErrorState((prev) => ({
      ...prev,
      confirmPassword: !passwordMatch,
    }));
    setErrorMessage((prev) => ({
      ...prev,
      confirmPassword: passwordMatch ? '' : '비밀번호가 일치하지 않습니다.',
    }));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    if (id === 'id' && errorMessage.alreadyUsedName) {
      setErrorMessage((prev) => ({
        ...prev,
        alreadyUsedName: '',
      }));
      setErrorState((prev) => ({
        ...prev,
        alreadyUsedName: false,
      }));
    }
    setInputValue((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: inputValue.name,
        id: inputValue.id,
        password: inputValue.password,
        provider: 'general',
      }),
    });

    if (res.status === 200) {
      router.back();
    } else {
      setErrorMessage((prev) => ({
        ...prev,
        alreadyUsedName: '이미 사용중인 아이디 입니다.',
      }));
      setErrorState((prev) => ({
        ...prev,
        alreadyUsedName: true,
      }));
    }
  };

  useEffect(() => {
    if (inputValue.confirmPassword.length && inputValue.password.length) {
      validatePasswords();
    }
  }, [inputValue.password, inputValue.confirmPassword]);

  return (
    <Modal>
      <SignupForm onSubmit={onSubmit}>
        <LabelContainer>
          <label htmlFor="id">아이디</label>
          <input id="id" value={inputValue.id} onChange={onChange} />
          {errorState.alreadyUsedName && (
            <ErrorMessage message={errorMessage.alreadyUsedName} />
          )}
        </LabelContainer>

        <LabelContainer>
          <label htmlFor="name">닉네임</label>
          <input id="name" value={inputValue.name} onChange={onChange} />
        </LabelContainer>

        <LabelContainer>
          <label htmlFor="password">사용할 비밀번호</label>
          <input
            id="password"
            value={inputValue.password}
            onChange={onChange}
            type="password"
          />
        </LabelContainer>

        <LabelContainer>
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            id="confirmPassword"
            value={inputValue.confirmPassword}
            onChange={onChange}
            type="password"
          />
          {errorState.confirmPassword && (
            <ErrorMessage message={errorMessage.confirmPassword} />
          )}
        </LabelContainer>

        <Button
          disabled={
            !inputValue.id.length ||
            !inputValue.name.length ||
            !inputValue.password.length ||
            !inputValue.confirmPassword.length ||
            errorState.confirmPassword
          }
        >
          회원가입
        </Button>
      </SignupForm>
    </Modal>
  );
}

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 22px;

  label {
    font-size: 0.925rem;
    color: #333;
    position: relative;
  }

  input {
    margin-bottom: 27px;
    height: 42px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
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

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    background: lightgray;
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }

  @media (max-width: 575px) {
    height: 44px;
    font-size: 1.15rem;
    padding: 0 12px;
  }
`;

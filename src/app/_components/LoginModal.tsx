'use client';
import { signIn, useSession } from 'next-auth/react';
import Modal from './Modal';

export default function LoginModal() {
  const googleLogin = async () => {
    await signIn('google');
  };

  return (
    <Modal>
      <button onClick={googleLogin}>구글 로그인</button>
    </Modal>
  );
}

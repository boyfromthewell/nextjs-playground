import { ReactNode } from 'react';
import styled from 'styled-components';

export default function Modal({ children }: { children: ReactNode }) {
  return (
    <Background>
      <ModalContainer>{children}</ModalContainer>
    </Background>
  );
}

const Background = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalContainer = styled.div`
  background: #ffffff;
  position: relative;
  top: 30%;
  width: 770px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  height: max-content;
  z-index: 9999;

  @media (max-width: 991px) {
    width: 70vw;
  }
`;

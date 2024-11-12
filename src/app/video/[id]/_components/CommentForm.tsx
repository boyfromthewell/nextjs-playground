import { useSession } from 'next-auth/react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface CommentFormProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  resetText: () => void;
  sendComment: () => void;
}

export default function CommentForm({
  value,
  onChange,
  resetText,
  sendComment,
}: CommentFormProps) {
  const { data } = useSession();

  return (
    <FormContainer>
      {!data && (
        <OverlayForm>
          <p>로그인 완료 된 사용자만 이용 가능합니다.</p>
        </OverlayForm>
      )}
      <span>댓글 남기기</span>
      <Name>{data?.user.email || data?.user.name}</Name>
      <CommentInput value={value} onChange={onChange} />
      <ButtonWrapper>
        <CancelBtn onClick={resetText}>취소</CancelBtn>
        <SendBtn disabled={!value} onClick={sendComment}>
          댓글
        </SendBtn>
      </ButtonWrapper>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  gap: 12px;
  padding: 12px;
  span {
    font-size: 18px;
    font-weight: 600;
  }
`;

const OverlayForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 999;
  width: calc(100% + 24px);
  height: calc(100% + 24px);
  top: -12px;
  left: -12px;
  background-color: rgba(0, 0, 0, 0.7);
  p {
    font-size: 1.125rem;
    line-height: 1.8rem;
    font-weight: 600;
    color: #45b6fe;
  }
`;

const Name = styled.p``;

const CommentInput = styled.textarea`
  width: 100%;
  resize: none;
  font-size: 1.225rem;
  padding: 7px;
  border-radius: 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const SendBtn = styled.button`
  padding: 10px;
  border-radius: 12px;
  border: none;
  font-size: 16px;
  background-color: transparent;
  &:disabled {
    background-color: lightgrey;
  }
  &:not(:disabled) {
    color: #fff;
    background: #065fd4;
  }
`;

const CancelBtn = styled(SendBtn)`
  &:not(:disabled) {
    background-color: transparent;
    color: black;
    &:hover {
      background-color: lightgrey;
    }
  }
`;

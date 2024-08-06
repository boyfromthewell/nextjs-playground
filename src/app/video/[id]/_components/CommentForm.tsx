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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  gap: 12px;
  border-radius: 12px;
  border: 1px solid lightgray;
  padding: 12px;
  span {
    font-size: 18px;
    font-weight: 600;
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

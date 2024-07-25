import styled from 'styled-components';

export default function LoginButton() {
  return (
    <Wrapper>
      <Button>로그인/회원가입</Button>
      <span>더 많은 즐거움을 누려보세요!</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  span {
    font-size: 12px;
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
`;

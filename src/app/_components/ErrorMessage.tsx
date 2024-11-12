import styled from 'styled-components';

export default function ErrorMessage({ message }: { message: string }) {
  return <Text>{message}</Text>;
}

const Text = styled.span`
  position: absolute;
  font-size: 0.7rem;
  color: #ed4337;
  bottom: 8px;
`;

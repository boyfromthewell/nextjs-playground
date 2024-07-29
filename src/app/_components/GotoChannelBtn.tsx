import Link from 'next/link';
import styled from 'styled-components';
import TVIcon from '../../../public/tv.svg';

export default function GotoChannelBtn({
  channel,
  id,
}: {
  channel: string;
  id: string;
}) {
  return (
    <Link href={`https://www.youtube.com/channel/${id}`} target="_blank">
      <GotoChannel>
        <TVIcon />
        {channel}
      </GotoChannel>
    </Link>
  );
}
const GotoChannel = styled.button`
  width: max-content;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid gray;
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
`;

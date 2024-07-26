import styled from 'styled-components';
import KRIcon from '../../../public/korea.svg';
import JPIcon from '../../../public/japan.svg';
import USIcon from '../../../public/usa.svg';
import UKIcon from '../../../public/uk.svg';
import RUIcon from '../../../public/russia.svg';
import FRIcon from '../../../public/france.svg';
import DEIcon from '../../../public/germany.svg';
import ITIcon from '../../../public/italy.svg';
import INIcon from '../../../public/india.svg';
import VNIcon from '../../../public/vietnam.svg';

interface FlagIconsProp {
  onClick: (code: string) => void;
  selectCode: string;
}

export default function FlagIcons({ onClick, selectCode }: FlagIconsProp) {
  return (
    <IconContainer>
      {ICON_DATA.map(({ icon, code }) => (
        <IconWrapper
          key={code}
          onClick={() => onClick(code)}
          $isSelect={code === selectCode}
        >
          {icon}
        </IconWrapper>
      ))}
    </IconContainer>
  );
}

const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 800px;
  align-items: center;
  justify-content: center;
  gap: 17px;
  padding-top: 12px;
  margin: 0 auto;
  svg {
    cursor: pointer;
    width: 50px;
    height: 50px;
  }
`;

const IconWrapper = styled.div<{ $isSelect: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.$isSelect && '#dad8c9'};
  padding: 5px;
  border-radius: 8px;
`;

const ICON_DATA = [
  {
    icon: <KRIcon />,
    code: 'KR',
  },
  {
    icon: <JPIcon />,
    code: 'JP',
  },
  {
    icon: <USIcon />,
    code: 'US',
  },
  {
    icon: <UKIcon />,
    code: 'GB',
  },
  {
    icon: <RUIcon />,
    code: 'RU',
  },
  {
    icon: <FRIcon />,
    code: 'FR',
  },
  {
    icon: <DEIcon />,
    code: 'DE',
  },
  {
    icon: <ITIcon />,
    code: 'IT',
  },
  {
    icon: <INIcon />,
    code: 'IN',
  },
  {
    icon: <VNIcon />,
    code: 'VN',
  },
];

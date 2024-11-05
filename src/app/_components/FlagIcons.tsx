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
import ArrowIcon from '../../../public/arrow_down.svg';

import { useState } from 'react';

interface FlagIconsProp {
  onClick: (code: string) => void;
  selectCode: string;
}

export default function FlagIcons({ onClick, selectCode }: FlagIconsProp) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelect = () => {
    setIsOpen((prev) => !prev);
  };

  const renderSelectValue = () => {
    const findByCode = ICON_DATA.find(({ code }) => code === selectCode);
    return (
      <p>
        {findByCode?.icon} <span>{findByCode?.text} </span>
      </p>
    );
  };

  console.log(ICON_DATA.find(({ code }) => code === selectCode));
  return (
    <IconContainer onClick={toggleSelect}>
      <SelectValue>{renderSelectValue()}</SelectValue>
      <ArrowDownIcon />
      {isOpen && (
        <SelectValueList>
          {ICON_DATA.map(({ icon, code, text }) => (
            <Value
              key={code}
              onClick={() => onClick(code)}
              $isSelect={code === selectCode}
            >
              {icon} <span>{text}</span>
            </Value>
          ))}
        </SelectValueList>
      )}
    </IconContainer>
  );
}

const IconContainer = styled.div`
  position: relative;
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid gray;
  height: 44px;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px;
  @media (max-width: 575px) {
    margin: 0 12px;
    box-sizing: border-box;
  }
`;

const ArrowDownIcon = styled(ArrowIcon)`
  width: 24px;
  height: 24px;
`;

const SelectValue = styled.div`
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  p {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

const SelectValueList = styled.div`
  position: absolute;
  max-height: 220px;
  overflow: auto;
  border: 1px solid gray;
  border-radius: 8px;
  top: 48px;
  left: -0px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  background-color: #fff;
`;

const Value = styled.div<{ $isSelect: boolean }>`
  width: 100%;
  height: 34px;
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 1.2rem;
  svg {
    width: 25px;
    height: 25px;
  }
  padding: 8px;
  &:first-of-type {
    border-radius: 8px 8px 0 0;
  }
  &:last-of-type {
    border-radius: 0 0 8px 8px;
  }
  &:hover {
    background-color: #e9ecef;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  background-color: ${(props) => props.$isSelect && '#e9ecef'};
  font-weight: ${(props) => (props.$isSelect ? 600 : 400)};
`;

const ICON_DATA = [
  {
    icon: <KRIcon />,
    code: 'KR',
    text: '대한민국',
  },
  {
    icon: <JPIcon />,
    code: 'JP',
    text: '일본',
  },
  {
    icon: <USIcon />,
    code: 'US',
    text: '미국',
  },
  {
    icon: <UKIcon />,
    code: 'GB',
    text: '영국',
  },
  {
    icon: <RUIcon />,
    code: 'RU',
    text: '러시아',
  },
  {
    icon: <FRIcon />,
    code: 'FR',
    text: '프랑스',
  },
  {
    icon: <DEIcon />,
    code: 'DE',
    text: '독일',
  },
  {
    icon: <ITIcon />,
    code: 'IT',
    text: '이탈리아',
  },
  {
    icon: <INIcon />,
    code: 'IN',
    text: '인도',
  },
  {
    icon: <VNIcon />,
    code: 'VN',
    text: '베트남',
  },
];

import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { parseISO } from 'date-fns';
// hooks
import useExamTimer from 'hooks/commons/useExamTimer';
// styles
import { typo } from 'sjds';

/** 시험모드 타이머 */
const Timer = ({ isMinimum = false, status, endDate, onExit }: Props) => {
  const target = useRef<HTMLDivElement>(null);
  const [standardDate, setStandardDate] = useState<Date>(new Date(8640000000000000));

  const { isDone } = useExamTimer({ target, endDate: standardDate });

  useEffect(() => {
    !!endDate && setStandardDate(parseISO(endDate));
  }, [endDate]);

  useEffect(() => {
    if (isDone) {
      onExit();
    }
  }, [isDone, onExit]);

  return (
    <Wrapper minimum={isMinimum}>
      {!isDone && status === 'Ing' && (
        <>
          <Name minimum={isMinimum}>남은 시간</Name>
          <Value ref={target} minimum={isMinimum}></Value>
        </>
      )}

      {isDone && <Name minimum={isMinimum}>시험 시간이 아닙니다</Name>}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ minimum: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ minimum }) => (minimum ? '8px' : '16px')};
`;

const Name = styled.p<{ minimum: boolean }>`
  ${({ minimum }) => (minimum ? typo.subtitle3 : typo.headline1)};
  color: ${({ theme }) => theme.text.f2};
`;

const Value = styled.p<{ minimum: boolean }>`
  width: ${({ minimum }) => (minimum ? '50px' : '120px')};
  ${typo.headline1};
  ${({ minimum }) => (minimum ? typo.subtitle3 : typo.headline1)};
  font-weight: 400;
  text-align: right;
  color: ${({ theme }) => theme.semantic.danger};
`;

type Props = {
  isMinimum?: boolean;
  status: 'Before' | 'Ing' | 'After' | null;
  endDate?: string;
  onExit: () => void;
};

export default Timer;

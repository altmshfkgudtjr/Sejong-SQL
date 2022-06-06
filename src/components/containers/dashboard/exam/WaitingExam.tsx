import styled, { useTheme } from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { parseISO } from 'date-fns';
// components
import { Icon } from 'sjds/components/icons';
import { FillButton } from 'sjds/components/buttons';
// hooks
import useExamTimer from 'hooks/commons/useExamTimer';
// styles
import { typo } from 'sjds';

const WatingExam = ({ status, startDate, onEntry }: Props) => {
  const currentTheme = useTheme();

  const target = useRef<HTMLElement>(null);
  const [standardDate, setStandardDate] = useState(new Date());

  const { isDone } = useExamTimer({ target, endDate: standardDate });

  useEffect(() => {
    !!startDate && setStandardDate(parseISO(startDate));
  }, [startDate]);

  return (
    <Wrapper>
      {status === 'Before' && (
        <>
          {isDone && (
            <>
              <Icon name="ic_unlock" width={128} height={128} />
              <Text>시험이 시작되었습니다!</Text>
            </>
          )}

          {!isDone && (
            <>
              <Icon name="ic_lock" width={128} height={128} />
              <Text>
                시험이 <mark ref={target} />
                뒤에 시작됩니다.
              </Text>
            </>
          )}

          <EntryButton
            onClick={onEntry}
            size="Large"
            color={currentTheme.primary}
            disabled={!isDone}
          >
            입장하기
          </EntryButton>
        </>
      )}
      {status === 'After' && (
        <>
          <Icon name="ic_lock" width={128} height={128} />
          <Text>
            고생하셨습니다
            <br />
            시험이 종료되었습니다.
          </Text>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const Text = styled.p`
  margin-top: 8px;
  ${typo.subtitle2};
  color: ${({ theme }) => theme.text.f1};

  mark {
    color: ${({ theme }) => theme.semantic.info};
  }
`;

const EntryButton = styled(FillButton)`
  margin-top: 32px;
`;

type Props = {
  status: 'Before' | 'Ing' | 'After' | null;
  startDate?: string;
  onEntry: () => void;
};

export default WatingExam;

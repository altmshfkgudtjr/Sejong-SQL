import styled, { css } from 'styled-components';
import Link from 'next/link';
// utils
import { commaFormatter } from 'utils/helpers/format';
// styles
import { typo, lib } from 'sjds';

/**
 * 주차 카드
 * @param props
 * @param props.classId 분반 ID
 * @param props.week 주차 정보
 */
const WeekCard = ({ classId, week }: Props) => {
  return (
    <Link href={`/dashboard/${classId}/${week.id}`} passHref>
      <Wrapper as="a">
        <div>
          <Name>{week.name}</Name>
          <PassCount>총 통과자 {commaFormatter(week.passCount)}명</PassCount>
        </div>

        <BottomWrapper>
          <Score>
            {week.solvedCount}/{week.problemCount}
          </Score>
          <ProblemCount>총 {week.problemCount} 문제</ProblemCount>
        </BottomWrapper>
      </Wrapper>
    </Link>
  );
};

const Name = styled.p`
  margin-bottom: 8px;
  ${typo.subtitle1};
  color: ${({ theme }) => theme.text.f1};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  height: 180px;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border.b2};
  background-color: ${({ theme }) => theme.background.bg1};

  ${({ theme }) =>
    lib.onlyHover(css`
      ${Name} {
        color: ${theme.semantic.info};
      }
    `)}
`;

const PassCount = styled.p`
  ${typo.body3};
  color: ${({ theme }) => theme.text.f4};
  ${lib.textLineClamp(1)};
`;

const BottomWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Score = styled.span`
  ${typo.headline3};
  color: ${({ theme }) => theme.semantic.success};
`;

const ProblemCount = styled.span`
  ${typo.headline3};
  color: ${({ theme }) => theme.semantic.info};
`;

type Props = {
  classId: string;
  week: {
    id: string;
    name: string;
    passCount: number;
    problemCount: number;
    solvedCount: number;
  };
};

export default WeekCard;

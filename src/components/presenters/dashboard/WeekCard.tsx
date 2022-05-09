import styled from 'styled-components';
// utils
import { commaFormatter } from 'utils/helpers/format';
// styles
import { typo, lib } from 'sjds';

/**
 * 주차 카드
 * @param props
 * @param props.name 주차명
 * @param props.passCount 주차 통과한 사람 수
 * @param props.problemCount 주차 문제 수
 * @param props.solvedCount 내가 푼 문제 수
 */
const WeekCard = ({ name, passCount, problemCount, solvedCount }: Props) => {
  return (
    <Wrapper>
      <div>
        <Name>{name}</Name>
        <PassCount>총 통과자 {commaFormatter(passCount)}명</PassCount>
      </div>

      <BottomWrapper>
        <Score>
          {solvedCount}/{problemCount}
        </Score>
        <ProblemCount>총 {problemCount} 문제</ProblemCount>
      </BottomWrapper>
    </Wrapper>
  );
};

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
`;

const Name = styled.p`
  margin-bottom: 8px;
  ${typo.subtitle1};
  color: ${({ theme }) => theme.text.f1};
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
  name: string;
  passCount: number;
  problemCount: number;
  solvedCount: number;
};

export default WeekCard;

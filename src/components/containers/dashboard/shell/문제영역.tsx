import styled from 'styled-components';
// components
import Badge from 'components/presenters/dashboard/shell/Badge';
import ProblemTitle from 'components/presenters/dashboard/shell/ProblemTitle';
// styles
import { typo } from 'sjds';

/**
 * 문제영역
 * @param props
 * @param props.problemId 문제 ID
 */
const 문제영역 = ({ problemId }: Props) => {
  return (
    <Wrapper>
      <TitleWrapper>
        <ProblemTitle title="강아지 이름 출력하는 문제" />
      </TitleWrapper>

      <Badge text="문제 설명" />

      <ContentWrapper>
        {`문제 설명

왈왈왈 짖는 강아지의 이름을 출력하세요.`}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.section``;

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 16px;
`;

const ContentWrapper = styled.div`
  white-space: pre-wrap;
  ${typo.body3};
  color: ${({ theme }) => theme.text.f1};
`;

type Props = {
  problemId: string;
};

export default 문제영역;

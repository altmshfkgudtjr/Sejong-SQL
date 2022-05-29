import styled from 'styled-components';
// components
import Badge from 'components/presenters/dashboard/shell/Badge';
import ProblemTitle from 'components/presenters/dashboard/shell/ProblemTitle';
import ProblemContent from 'components/presenters/dashboard/shell/ProblemContent';
// hooks
import * as useProblemController from 'hooks/controllers/useProblemController';

/**
 * 문제영역
 * @param props
 * @param props.problemId 문제 ID
 */
const 문제영역 = ({ problemId }: Props) => {
  const { status, data } = useProblemController.GetProblem(problemId);

  return (
    <Wrapper>
      {status === 'success' && (
        <>
          <TitleWrapper>
            <ProblemTitle title={data?.result?.title} />
          </TitleWrapper>

          <Badge text="문제 설명" />

          <ProblemContent content={data?.result?.content} />
        </>
      )}
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

type Props = {
  problemId: number;
};

export default 문제영역;

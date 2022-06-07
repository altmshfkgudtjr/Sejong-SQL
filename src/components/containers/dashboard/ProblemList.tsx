import styled from 'styled-components';
// components
import ProblemCard from 'components/presenters/dashboard/ProblemCard';
import Empty from 'components/presenters/dashboard/Empty';
// hooks
import * as useClassController from 'hooks/controllers/useClassController';
import * as useProblemController from 'hooks/controllers/useProblemController';

/**
 * 대시보드 문제 리스트
 * @param props
 * @param props.classId 분반 ID
 * @param props.weekId 주차 ID
 */
const ProblemList = ({ classId, weekId }: Props) => {
  const { data: classData } = useClassController.GetClass(parseInt(classId as string, 10));
  const { data: problemData } = useProblemController.GetProblemList(parseInt(weekId as string, 10));

  /** 관리자 여부 */
  const isManager = classData?.result?.type === 'prof' || classData?.result?.type === 'ta';

  const ProblemCardList = problemData?.result?.map(problem => (
    <ProblemCard
      key={problem.id}
      problem={problem}
      classId={classId}
      weekId={weekId}
      isManager={isManager}
    />
  ));

  return (
    <Wrapper>
      {ProblemCardList && ProblemCardList?.length > 0 && ProblemCardList}
      {ProblemCardList && ProblemCardList?.length === 0 && <Empty message="문제가 비어있습니다." />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
`;

type Props = {
  classId: string;
  weekId: string;
};

export default ProblemList;

import styled from 'styled-components';
// components
import ProblemCard from 'components/presenters/dashboard/ProblemCard';
// hooks
import * as useUserController from 'hooks/controllers/useUserController';
import * as useProblemController from 'hooks/controllers/useProblemController';

/**
 * 대시보드 문제 리스트
 * @param props
 * @param props.classId 분반 ID
 * @param props.weekId 주차 ID
 */
const ProblemList = ({ classId, weekId }: Props) => {
  const { data: problemData } = useProblemController.GetProblemList(parseInt(weekId as string, 10));
  const { data: profileData } = useUserController.GetProfile();

  /** 관리자 여부 */
  const isManager = profileData?.result?.role === 'sa';

  const ProblemCardList = problemData?.result?.map(problem => (
    <ProblemCard
      key={problem.id}
      problem={problem}
      classId={classId}
      weekId={weekId}
      isManager={isManager}
    />
  ));

  return <Wrapper>{ProblemCardList}</Wrapper>;
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

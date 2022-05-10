import styled from 'styled-components';
// components
import ProblemCard from 'components/presenters/dashboard/ProblemCard';

/**
 * 대시보드 문제 리스트
 * @param props
 * @param props.classId 분반 ID
 * @param props.weekId 주차 ID
 */
const ProblemList = ({ classId, weekId }: Props) => {
  const problemList = [
    {
      id: 1,
      name: 'World에서 대한민국 국민들만 거르기',
      passCount: 2412220,
      isTry: true,
      scoreAccuracy: true,
      scoreEfficiency: 50,
    },
    {
      id: 2,
      name: 'World에서 나이별로 그룹짓기',
      passCount: 4120,
      isTry: true,
      scoreAccuracy: true,
      scoreEfficiency: 80,
    },
    {
      id: 3,
      name: '그들만의 리그',
      passCount: 14,
      isTry: false,
      scoreAccuracy: false,
      scoreEfficiency: 0,
    },
  ];

  const ProblemCardList = problemList.map(problem => (
    <ProblemCard key={problem.id} problem={problem} classId={classId} weekId={weekId} />
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

import styled from 'styled-components';
// components
import WeekCard from 'components/presenters/dashboard/WeekCard';
// styles
import { mediaQuery } from 'sjds';

/**
 * 대시보드 주차 리스트
 * @param props
 * @param props.classId 분반 ID
 */
const WeekList = ({ classId }: Props) => {
  const weekList = [
    {
      id: '1',
      name: '1주차 - 원하는 데이터 선택',
      passCount: 1002,
      problemCount: 8,
      solvedCount: 6,
    },
    {
      id: '2',
      name: '2주차 - 원하는 조건문 추가',
      passCount: 14,
      problemCount: 8,
      solvedCount: 3,
    },
  ];

  const WeekCardList = weekList.map(week => (
    <WeekCard key={week.id} classId={classId} week={week} />
  ));

  return <Wrapper>{WeekCardList}</Wrapper>;
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;

  ${mediaQuery.custom(500)} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${mediaQuery.medium} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${mediaQuery.xlarge} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

type Props = {
  classId: string;
};

export default WeekList;

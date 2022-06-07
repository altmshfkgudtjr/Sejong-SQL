import styled from 'styled-components';
// components
import WeekCard from 'components/presenters/dashboard/WeekCard';
import Empty from 'components/presenters/dashboard/Empty';
// hooks
import * as useWeekController from 'hooks/controllers/useWeekController';
// styles
import { mediaQuery } from 'sjds';

/**
 * 대시보드 주차 리스트
 * @param props
 * @param props.classId 분반 ID
 */
const WeekList = ({ classId }: Props) => {
  const { data } = useWeekController.GetWeekList(classId);

  const WeekCardList = data?.result?.map(week => (
    <WeekCard key={week.id} classId={`${classId}`} week={week} />
  ));

  return (
    <>
      {WeekCardList && WeekCardList.length > 0 && <Wrapper>{WeekCardList}</Wrapper>}
      {WeekCardList && WeekCardList.length === 0 && (
        <Empty type="Week" message="주차가 비어있습니다." />
      )}
    </>
  );
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
  classId: number;
};

export default WeekList;

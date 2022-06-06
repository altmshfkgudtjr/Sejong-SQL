import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import Router, { useRouter } from 'next/router';
import { format, parseISO } from 'date-fns';
// components
import Layout from 'components/layouts';
import { DashboardLayout } from 'sjds/layouts';
import TextInput from 'components/atoms/inputs/Text';
import WeekDropdown from 'components/presenters/dashboard/analytics/WeekInput';
import WeekButton from 'components/presenters/dashboard/analytics/WeekButton';
import HistoryButton from 'components/presenters/dashboard/analytics/HistoryButton';
import Breadcrumb from 'components/containers/dashboard/Breadcrumb';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useDebounce from 'hooks/event/useDebounce';
import * as useWeekController from 'hooks/controllers/useWeekController';
import * as useAnalyticsController from 'hooks/controllers/useAnalyticsController';
// styles
import { typo } from 'sjds';
// types
import { Week } from 'types/api/week';
import { History } from 'types/api/analytics';

/** 통계 페이지 */
const AnalyticsPage = () => {
  const router = useRouter();
  const classId = parseInt(router.query.classId as string, 10);

  const sejongIdRef = useRef<HTMLInputElement>(null);
  const [week, setWeek] = useState<Week | null>(null);
  const [historyList, setHistoryList] = useState<History[]>([]);

  const { MetaTitle } = useMetaData();

  const { data: weekListData } = useWeekController.GetWeekList(classId);
  const { data: analyticsData, mutate: analyticsMutate } =
    useAnalyticsController.GetClassAnalytics();

  const onSearch = useDebounce(() => {
    analyticsMutate({
      classId,
      params: {
        weekId: week?.id,
        sejongId: sejongIdRef.current?.value,
      },
    });
  }, 300);

  useEffect(() => {
    onSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [week]);

  useEffect(() => {
    if (!analyticsData?.result) {
      return;
    }

    setHistoryList(analyticsData.result);
  }, [analyticsData]);

  return (
    <>
      <MetaTitle content="통계" />

      <Wrapper>
        <Breadcrumb />

        <Title>조건 입력</Title>
        <InputWrapper>
          <div>
            <h2>주차 선택</h2>
            <WeekDropdown value={week?.name} placeholder="주차를 선택해주세요">
              {weekListData?.result?.map(week => (
                <WeekButton
                  key={week.id}
                  labelList={[`${week.id}`, week.name]}
                  onClick={() => setWeek(week)}
                />
              ))}
            </WeekDropdown>
          </div>

          <div>
            <h2>학번 입력</h2>
            <TextInput
              type="text"
              ref={sejongIdRef}
              placeholder="학번을 입력해주세요"
              onInput={onSearch}
            />
          </div>
        </InputWrapper>

        <HistoryListWrapper>
          {historyList.length > 0 && (
            <>
              <HistoryListHead>
                <span>ID</span>
                <span>학번</span>
                <span>주차</span>
                <span>문제</span>
                <span>제출시간</span>
                <span>통과 여부</span>
              </HistoryListHead>
              {historyList.map(history => (
                <HistoryButton
                  key={history.usp_id}
                  labelList={[
                    `${history.usp_id}`,
                    history.sejong_id,
                    history.pg_name,
                    history.p_title,
                    format(parseISO(history.p_created_at), 'yyyy-MM-dd HH:mm:ss'),
                    history.accuracy ? 'PASS' : 'NON-PASS',
                  ]}
                  classId={classId}
                  uspId={history.usp_id}
                  enabledButton={history.access}
                />
              ))}
            </>
          )}
        </HistoryListWrapper>
      </Wrapper>
    </>
  );
};

AnalyticsPage.getLayout = page => {
  return <Layout isSide>{page}</Layout>;
};

const Wrapper = styled(DashboardLayout)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: calc(100vh - 112px);
  padding-top: 8px;
`;

const InputWrapper = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 32px;

  & > div {
    width: 320px;
    max-width: 100%;
  }

  & h2 {
    margin-bottom: 8px;
    ${typo.subtitle3};
    color: ${({ theme }) => theme.text.f2};
  }
`;

const Title = styled.h1`
  margin-bottom: 16px;
  ${typo.headline1};
  color: ${({ theme }) => theme.text.f1};
`;

const HistoryListWrapper = styled.section`
  padding: 16px 16px 0;
`;

const HistoryListHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  span {
    ${typo.subtitle2};
    color: ${({ theme }) => theme.text.f4};

    &:nth-child(1) {
      width: 60px;
    }

    &:nth-child(2) {
      width: 80px;
    }

    &:nth-child(3) {
      width: 100px;
    }

    &:nth-child(4) {
      width: 200px;
      padding: 0 20px;
    }

    &:nth-child(5) {
      width: 160px;
    }

    &:nth-child(6) {
      width: 80px;
      text-transform: uppercase;
    }
  }
`;

export default AnalyticsPage;

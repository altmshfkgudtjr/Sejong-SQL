import styled from 'styled-components';
import Router, { useRouter } from 'next/router';
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { isBefore, parseISO } from 'date-fns';
// components
import Layout from 'components/layouts';
import { MainLayout } from 'sjds/layouts';
import Breadcrumb from 'components/containers/dashboard/Breadcrumb';
import Timer from 'components/containers/dashboard/exam/Timer';
import ResizableArea from 'components/containers/dashboard/ResizableArea';
import 문제영역 from 'components/containers/dashboard/shell/문제영역';
import 풀이영역 from 'components/containers/dashboard/shell/풀이영역';
import 출력영역 from 'components/containers/dashboard/shell/출력영역';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import * as useProblemController from 'hooks/controllers/useProblemController';
import * as useWeekController from 'hooks/controllers/useWeekController';

/** 문제 페이지 */
const DashBoard = () => {
  const { query } = useRouter();
  const classId = parseInt(query.classId as string, 10);
  const weekId = parseInt(query.weekId as string, 10);
  const problemId = parseInt(query.problemId as string, 10);

  const inputValue = useRef('');
  const [status, setStatus] = useState<'Before' | 'Ing' | 'After' | null>(null);

  const { MetaTitle } = useMetaData();
  const { data: problemData } = useProblemController.GetProblem(problemId);
  const { data: weekData } = useWeekController.GetWeek(weekId);

  /** 시험 모드 여부 */
  const isExam = weekData?.result?.exam;

  const onChangeValue = value => {
    inputValue.current = value;
  };

  const onExit = useCallback(() => {
    setStatus('After');
    alert('시험이 종료되었습니다.');
    Router.push(`/dashboard/${classId}/${weekId}`);
  }, [classId, weekId]);

  useLayoutEffect(() => {
    if (!weekData?.result) {
      return;
    }

    const currentDate = new Date();
    const startDate = parseISO(weekData.result.activate_start);
    const endDate = parseISO(weekData.result.activate_end);

    if (isBefore(currentDate, startDate)) {
      setStatus('Before');
    } else if (isBefore(currentDate, endDate)) {
      setStatus('Ing');
    } else {
      setStatus('After');
    }
  }, [weekData]);

  useEffect(() => {
    if (problemData?.result) {
      onChangeValue(problemData.result.latest_query);
    }
  }, [problemData]);

  return (
    <>
      <MetaTitle content="문제" />

      <Wrapper>
        <TopWrapper>
          <Breadcrumb />
          {isExam && (
            <Timer
              status={status}
              endDate={weekData?.result?.activate_end}
              onExit={onExit}
              isMinimum={true}
            />
          )}
        </TopWrapper>

        <ShellWrapper>
          <ResizableArea
            left={<문제영역 problemId={problemId} />}
            top={
              <풀이영역
                initQuery={problemData?.result?.latest_query}
                onChangeValue={onChangeValue}
              />
            }
            bottom={
              <출력영역
                weekId={weekId}
                problemId={problemId}
                getUserQuery={() => inputValue.current}
              />
            }
          />
        </ShellWrapper>
      </Wrapper>
    </>
  );
};

DashBoard.getLayout = page => {
  return <Layout isSide>{page}</Layout>;
};

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: calc(100vh - 60px);
  padding-top: 8px;
`;

const TopWrapper = styled(MainLayout)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
`;

const ShellWrapper = styled.div`
  flex: 1;
  max-height: calc(100% - 36px - 16px);
  border-top: 1px solid ${({ theme }) => theme.background.bg4};
`;

export default DashBoard;

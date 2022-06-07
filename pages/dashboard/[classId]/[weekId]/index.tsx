import Link from 'next/link';
import styled, { useTheme } from 'styled-components';
import { useState, useLayoutEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { isBefore, parseISO } from 'date-fns';
// components
import Layout from 'components/layouts';
import { DashboardLayout } from 'sjds/layouts';
import { TextButton } from 'sjds/components/buttons';
import TopMessage from 'components/presenters/dashboard/TopMessage';
import Breadcrumb from 'components/containers/dashboard/Breadcrumb';
import Timer from 'components/containers/dashboard/exam/Timer';
import ProblemList from 'components/containers/dashboard/ProblemList';
import WatingExam from 'components/containers/dashboard/exam/WaitingExam';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useSnackbar from 'hooks/dom/useSnackbar';
import * as useClassController from 'hooks/controllers/useClassController';
import * as useWeekController from 'hooks/controllers/useWeekController';

/** 주차별 페이지 */
const WeekPage = () => {
  const { query } = useRouter();
  const classId = parseInt(query.classId as string, 10);
  const weekId = parseInt(query.weekId as string, 10);

  const [status, setStatus] = useState<'Before' | 'Ing' | 'After' | null>(null);

  const currentTheme = useTheme();
  const { MetaTitle } = useMetaData();
  const { initSnackbar } = useSnackbar();

  const { data: classData } = useClassController.GetClass(classId);
  const { data: weekData } = useWeekController.GetWeek(weekId);

  /** 관리자 여부 */
  const isManager = classData?.result?.type === 'prof' || classData?.result?.type === 'ta';

  /** 시험 모드 여부 */
  const isExam = weekData?.result?.exam;

  const onClickEntry = () => {
    if (!weekData?.result) {
      return;
    }

    const currentDate = new Date();
    const startDate = parseISO(weekData.result.activate_start);
    const endDate = parseISO(weekData.result.activate_end);

    if (isBefore(currentDate, startDate)) {
      setStatus('Before');
      initSnackbar({
        type: 'Warning',
        title: 'WARNING',
        message: '아직 시험이 시작되지 않았습니다',
      });
    } else if (isBefore(currentDate, endDate)) {
      setStatus('Ing');
      initSnackbar({
        type: 'Success',
        title: '시험 시작',
        message: '시험이 시작되었습니다. 건승을 빕니다!',
      });
    } else {
      setStatus('After');
      initSnackbar({
        type: 'Warning',
        title: 'WARNING',
        message: '시험이 종료되었습니다',
      });
    }
  };

  const onExit = useCallback(() => {
    setStatus('After');
    alert('시험이 종료되었습니다.');
  }, []);

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

  return (
    <>
      <MetaTitle content="주차" />

      <Wrapper>
        <Breadcrumb />

        <ManagerWrapper>
          <TopMessage message={weekData?.result ? weekData.result.comment : ''} />

          {isManager && (
            <ButtonWrapper>
              <Link href={`/dashboard/${classId}/${weekId}/edit`} passHref>
                <Button as="a" size="Regular" color={currentTheme.semantic.info}>
                  주차 수정하기
                </Button>
              </Link>

              <Link href={`/dashboard/${classId}/${weekId}/problem/new`} passHref>
                <Button as="a" size="Regular" color={currentTheme.semantic.info}>
                  문제 추가하기
                </Button>
              </Link>
            </ButtonWrapper>
          )}
        </ManagerWrapper>

        {isExam && !isManager && (
          <>
            {(status === 'Before' || status === 'After') && (
              <WatingExam
                status={status}
                startDate={weekData?.result?.activate_start}
                onEntry={onClickEntry}
              />
            )}

            {status === 'Ing' && (
              <>
                <Timer status={status} endDate={weekData?.result?.activate_end} onExit={onExit} />
                <ProblemList classId={query.classId as string} weekId={query.weekId as string} />
              </>
            )}
          </>
        )}

        {(!isExam || isManager) && (
          <>
            <ProblemList classId={query.classId as string} weekId={query.weekId as string} />
          </>
        )}
      </Wrapper>
    </>
  );
};

WeekPage.getLayout = page => {
  return <Layout isSide>{page}</Layout>;
};

const Wrapper = styled(DashboardLayout)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 8px;
`;

const ManagerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Button = styled(TextButton)`
  flex: 0 1 auto;
`;

export default WeekPage;

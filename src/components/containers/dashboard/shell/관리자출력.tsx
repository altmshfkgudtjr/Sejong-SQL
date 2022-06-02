import styled, { useTheme } from 'styled-components';
import { useEffect } from 'react';
import Router from 'next/router';
// components
import Badge from 'components/presenters/dashboard/shell/Badge';
import QueryTable from 'components/presenters/dashboard/shell/QueryTable';
import { FillButton } from 'sjds/components/buttons';
// hooks
import * as useProblemController from 'hooks/controllers/useProblemController';
import useSnackbar from 'hooks/dom/useSnackbar';
// styles
import { typo } from 'sjds';

const 관리자출력영역 = ({ envId, classId, weekId, problemId, getUserQuery, onSubmit }: Props) => {
  const currentTheme = useTheme();

  const { initSnackbar } = useSnackbar();
  const {
    mutate: runMutate,
    status: runStatus,
    data: runData,
  } = useProblemController.RunNewProblem();
  const { mutate: deleteMutate } = useProblemController.RemoveProblem();
  const { refetch: problemRefetch } = useProblemController.GetProblemList(weekId);

  const onDelete = () => {
    if (!problemId) {
      return;
    }

    if (confirm('문제를 삭제하시겠습니까?')) {
      deleteMutate(
        { classId, problemId },
        {
          onSuccess: () => {
            initSnackbar({
              type: 'Success',
              title: 'SUCCESS',
              message: '문제가 삭제 완료되었습니다',
            });
            problemRefetch();
            Router.replace(`/dashboard/${classId}/${weekId}`);
          },
          onError: () => {
            initSnackbar({
              type: 'Danger',
              title: 'ERROR',
              message: '오류가 발생하였습니다. 잠시 후 다시 시도해주세요',
            });
          },
        },
      );
    }
  };

  const onRun = () => {
    const query = getUserQuery();

    if (!envId) {
      initSnackbar({
        type: 'Warning',
        title: 'Warning',
        message: '가상 데이터베이스를 먼저 선택해주세요',
      });
      return;
    }

    if (query.length === 0) {
      initSnackbar({ type: 'Warning', title: 'Warning', message: '쿼리가 비어있습니다' });
      return;
    }

    runMutate({
      envId,
      classId,
      data: { query },
    });
  };

  useEffect(() => {
    if (runStatus === 'success') {
      initSnackbar({ type: 'Success', title: 'RUN', message: '쿼리가 실행 완료되었습니다' });
    }

    if (runStatus === 'error') {
      initSnackbar({ type: 'Danger', title: 'WARNING', message: '잠시 후 다시 시도해주세요' });
    }
  }, [runStatus, initSnackbar]);

  return (
    <Wrapper>
      <Badge text="실행 결과" />

      <Body>
        {runStatus === 'success' && runData?.result?.status && (
          <QueryTable data={runData?.result.query_result as object[]} />
        )}
        {runStatus === 'success' && !runData?.result?.status && (
          <ErrorMessage>{runData?.result?.query_result}</ErrorMessage>
        )}
      </Body>

      <Footer>
        {!!problemId && (
          <Button onClick={onDelete} color={currentTheme.semantic.danger} size="Regular">
            문제 삭제
          </Button>
        )}
        <Button
          onClick={onRun}
          color={currentTheme.primary}
          size="Regular"
          disabled={runStatus === 'loading'}
        >
          {runStatus === 'loading' && <>실행 중</>}
          {runStatus !== 'loading' && <>쿼리 실행</>}
        </Button>
        <Button onClick={onSubmit} color={currentTheme.primary} size="Regular">
          {problemId ? '문제 수정' : '문제 생성'}
        </Button>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;
`;

const Body = styled.div`
  flex: 1;
  padding-right: 20px;
`;

const ErrorMessage = styled.p`
  ${typo.subtitle2};
`;

const Footer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  position: sticky;
  padding: 16px 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.background.bg3};
`;

const Button = styled(FillButton)`
  flex: 0 1 auto;
  width: 120px;
  white-space: nowrap;
`;

type Props = {
  envId?: number;
  classId: number;
  weekId: number;
  problemId?: number;
  getUserQuery: () => string;
  onSubmit: () => void;
};

export default 관리자출력영역;

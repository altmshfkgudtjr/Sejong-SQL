import styled, { useTheme } from 'styled-components';
import { useEffect } from 'react';
// components
import Badge from 'components/presenters/dashboard/shell/Badge';
import QueryTable from 'components/presenters/dashboard/shell/QueryTable';
import { FillButton } from 'sjds/components/buttons';
// hooks
import * as useProblemController from 'hooks/controllers/useProblemController';
import useSnackbar from 'hooks/dom/useSnackbar';
// styles
import { typo } from 'sjds';

const 출력영역 = ({ problemId, getUserQuery }: Props) => {
  const currentTheme = useTheme();

  const { initSnackbar } = useSnackbar();
  const { mutate: runMutate, status: runStatus, data: runData } = useProblemController.RunProblem();
  const { mutate: submitMutate, status: submitStatus } = useProblemController.SubmitProblem();

  const onRun = () => {
    const query = getUserQuery();

    if (query.length === 0) {
      initSnackbar({ type: 'Warning', title: 'Warning', message: '쿼리가 비어있습니다' });
      return;
    }

    runMutate({
      problemId,
      data: { query },
    });
  };

  const onSubmit = () => {
    const query = getUserQuery();

    if (query.length === 0) {
      initSnackbar({ type: 'Warning', title: 'Warning', message: '쿼리가 비어있습니다' });
      return;
    }

    submitMutate({
      problemId,
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

  useEffect(() => {
    if (submitStatus === 'success') {
      initSnackbar({ type: 'Success', title: 'COMPLETE', message: '쿼리가 제출되었습니다' });
    }

    if (submitStatus === 'error') {
      initSnackbar({ type: 'Danger', title: 'WARNING', message: '잠시 후 다시 시도해주세요' });
    }
  }, [submitStatus, initSnackbar]);

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
        <Button
          onClick={onRun}
          color={currentTheme.primary}
          size="Regular"
          disabled={runStatus === 'loading'}
        >
          {runStatus === 'loading' && <>실행 중</>}
          {runStatus !== 'loading' && <>쿼리 실행</>}
        </Button>
        <Button
          onClick={onSubmit}
          color={currentTheme.primary}
          size="Regular"
          disabled={submitStatus === 'loading'}
        >
          {submitStatus === 'loading' && <>제출 중</>}
          {submitStatus !== 'loading' && <>제출하기</>}
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
`;

type Props = {
  problemId: number;
  getUserQuery: () => string;
};

export default 출력영역;

import styled from 'styled-components';
import Router, { useRouter } from 'next/router';
import { useState, useRef, useCallback } from 'react';
// components
import Layout from 'components/layouts';
import { MainLayout } from 'sjds/layouts';
import Breadcrumb from 'components/containers/dashboard/Breadcrumb';
import ResizableArea from 'components/containers/dashboard/ResizableArea';
import 문제출제 from 'components/containers/dashboard/shell/문제출제';
import 풀이영역 from 'components/containers/dashboard/shell/풀이영역';
import 관리자출력영역 from 'components/containers/dashboard/shell/관리자출력';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useSnackbar from 'hooks/dom/useSnackbar';
import * as useProblemController from 'hooks/controllers/useProblemController';
import * as useEnvironmentController from 'hooks/controllers/useEnvironmentController';
// types
import type { Environment } from 'types/api/environment';
import type { Warning } from 'types/api/problem';

/** 문제 생성 페이지 */
const ProblemCreatePage = () => {
  const { query } = useRouter();
  const classId = parseInt(query.classId as string, 10);
  const weekId = parseInt(query.weekId as string, 10);

  const { MetaTitle } = useMetaData();
  const { initSnackbar } = useSnackbar();

  const { refetch: problemListRefetch } = useProblemController.GetProblemList(weekId);
  const { mutate: connectMutate } = useEnvironmentController.ConnectEnvToClass();
  const { mutate: createMutate } = useProblemController.CreateProblem();
  useProblemController.GetWarningList();

  const problemInfo = useRef({
    title: '',
    content: '',
  });
  const inputQuery = useRef('');
  const timeLimit = useRef(10);
  const [env, setEnv] = useState<Environment | null>(null);
  const [warningList, setWarningList] = useState<Warning[]>([]);

  const onChangeValue = (value: string) => (inputQuery.current = value);

  const onChangeWarningList = (value: Warning[]) => setWarningList(value);

  const onSubmit = useCallback(() => {
    if (!problemInfo.current.title) {
      initSnackbar({
        type: 'Warning',
        title: 'WARNING',
        message: '문제 이름을 작성해주세요',
      });
      return;
    }

    if (!problemInfo.current.content) {
      initSnackbar({
        type: 'Warning',
        title: 'WARNING',
        message: '문제 설명을 작성해주세요',
      });
      return;
    }

    if (!env) {
      initSnackbar({
        type: 'Warning',
        title: 'WARNING',
        message: '가상 데이터베이스가 선택되지 않았습니다',
      });
      return;
    }

    if (!inputQuery.current) {
      initSnackbar({
        type: 'Warning',
        title: 'WARNING',
        message: '올바른 정답이 나오는 쿼리문을 작성해주세요',
      });
      return;
    }

    const onSubmitAfterConnect = () => {
      createMutate(
        {
          classId,
          weekId,
          data: {
            env_id: env.id,
            title: problemInfo.current.title,
            content: problemInfo.current.content,
            answer: inputQuery.current,
            timelimit: timeLimit.current,
            warnings: warningList.map(v => v.id),
          },
        },
        {
          onSuccess: () => {
            problemListRefetch();
            initSnackbar({
              type: 'Success',
              title: 'SUCCESS',
              message: '문제가 생성되었습니다',
            });
            Router.push(`/dashboard/${classId}/${weekId}`);
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
    };

    if (env.owner === '') {
      connectMutate(
        { envId: env.id, classId },
        {
          onSuccess: () => onSubmitAfterConnect(),
        },
      );
    } else {
      onSubmitAfterConnect();
    }
  }, [
    createMutate,
    connectMutate,
    initSnackbar,
    problemListRefetch,
    classId,
    weekId,
    env,
    warningList,
  ]);

  return (
    <>
      <MetaTitle content="새로운 문제 생성" />

      <Wrapper>
        <TopWrapper>
          <Breadcrumb />
        </TopWrapper>

        <ShellWrapper>
          <ResizableArea
            left={
              <문제출제
                classId={classId}
                envName={env ? env.name : ''}
                warningList={warningList}
                onChangeEnv={(env: Environment) => setEnv(env)}
                onChangeValue={(title, content) => {
                  problemInfo.current.title = title;
                  problemInfo.current.content = content;
                }}
                onChangeWarningList={onChangeWarningList}
              />
            }
            top={<풀이영역 onChangeValue={onChangeValue} />}
            bottom={
              <관리자출력영역
                envId={env?.id}
                classId={classId}
                weekId={weekId}
                getUserQuery={() => inputQuery.current}
                onSubmit={onSubmit}
              />
            }
          />
        </ShellWrapper>
      </Wrapper>
    </>
  );
};

ProblemCreatePage.getLayout = page => {
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
  justify-content: flex-start;
  width: 100%;
  max-width: 100%;
`;

const ShellWrapper = styled.div`
  flex: 1;
  max-height: calc(100% - 36px - 16px);
  border-top: 1px solid ${({ theme }) => theme.background.bg4};
`;

export default ProblemCreatePage;

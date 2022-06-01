import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState, useRef, useCallback } from 'react';
// components
import Layout from 'components/layouts';
import { MainLayout } from 'sjds/layouts';
import Breadcrumb from 'components/containers/dashboard/Breadcrumb';
import ResizableArea from 'components/containers/dashboard/ResizableArea';
import 문제출제 from 'components/containers/dashboard/shell/문제출제';
import 풀이영역 from 'components/containers/dashboard/shell/풀이영역';
import 출력영역 from 'components/containers/dashboard/shell/출력영역';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useSnackbar from 'hooks/dom/useSnackbar';
import * as useProblemController from 'hooks/controllers/useProblemController';
// types
import type { Environment } from 'types/api/environment';

/** 문제 생성 페이지 */
const ProblemCreatePage = () => {
  const { query } = useRouter();
  const classId = parseInt(query.classId as string, 10);
  const weekId = parseInt(query.weekId as string, 10);

  const { MetaTitle } = useMetaData();
  const { initSnackbar } = useSnackbar();

  const { mutate: createMutate } = useProblemController.CreateProblem();

  const problemInfo = useRef({
    title: '',
    content: '',
  });
  const inputValue = useRef('');
  const timeLimit = useRef(10);
  const [env, setEnv] = useState<Environment | null>(null);
  const [warningIdList, setWarningIdList] = useState<number[]>([]);

  const onChangeValue = value => {
    inputValue.current = value;
  };

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

    if (!inputValue.current) {
      initSnackbar({
        type: 'Warning',
        title: 'WARNING',
        message: '올바른 정답이 나오는 쿼리문을 작성해주세요',
      });
      return;
    }

    createMutate({
      classId,
      weekId,
      data: {
        env_id: env.id,
        title: problemInfo.current.title,
        content: problemInfo.current.content,
        answer: inputValue.current,
        timelimit: timeLimit.current,
        warnings: warningIdList,
      },
    });
  }, [createMutate, initSnackbar, classId, weekId, env, warningIdList]);

  return (
    <>
      <MetaTitle content="문제 생성" />

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
                onChangeEnv={(env: Environment) => setEnv(env)}
                onChangeValue={(title, content) => {
                  problemInfo.current.title = title;
                  problemInfo.current.content = content;
                }}
              />
            }
            top={<풀이영역 onChangeValue={onChangeValue} />}
            bottom={<div />}
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

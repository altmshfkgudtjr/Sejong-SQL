import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
// components
import Layout from 'components/layouts';
import { MainLayout } from 'sjds/layouts';
import Breadcrumb from 'components/containers/dashboard/Breadcrumb';
import ResizableArea from 'components/containers/dashboard/ResizableArea';
import 통계문제영역 from 'components/containers/dashboard/shell/통계문제영역';
import 통계풀이영역 from 'components/containers/dashboard/shell/통계풀이영역';
import 쿼리출력영역 from 'components/containers/dashboard/shell/쿼리출력영역';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import * as useAnalyticsController from 'hooks/controllers/useAnalyticsController';

/** 통게 진입 문제 페이지 */
const AnalyticsQueryPage = () => {
  const { query } = useRouter();
  const uspId = parseInt(query.uspId as string, 10);

  const inputValue = useRef('');

  const { MetaTitle } = useMetaData();
  const { data: problemData } = useAnalyticsController.GetUserSubmission({ uspId });
  console.log(problemData);

  const onChangeValue = value => {
    inputValue.current = value;
  };

  useEffect(() => {
    if (problemData?.result) {
      onChangeValue(problemData.result.query);
    }
  }, [problemData]);

  return (
    <>
      <MetaTitle content={`통계 - ${problemData?.result?.title}`} />

      <Wrapper>
        <TopWrapper>
          <Breadcrumb />
        </TopWrapper>

        <ShellWrapper>
          {problemData?.result && (
            <>
              <ResizableArea
                left={<통계문제영역 uspId={uspId} />}
                top={
                  <통계풀이영역
                    initQuery={problemData.result.query}
                    onChangeValue={onChangeValue}
                  />
                }
                bottom={
                  <쿼리출력영역
                    isPass={problemData.result.accuracy}
                    warningList={problemData.result.warnings}
                  />
                }
              />
            </>
          )}
        </ShellWrapper>
      </Wrapper>
    </>
  );
};

AnalyticsQueryPage.getLayout = page => {
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

export default AnalyticsQueryPage;

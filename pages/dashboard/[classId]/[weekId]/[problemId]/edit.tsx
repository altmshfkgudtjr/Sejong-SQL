import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useRef } from 'react';
// components
import Layout from 'components/layouts';
import { MainLayout } from 'sjds/layouts';
import Sidebar from 'components/containers/Sidebar';
import Breadcrumb from 'components/containers/dashboard/Breadcrumb';
import ResizableArea from 'components/containers/dashboard/ResizableArea';
import 문제영역 from 'components/containers/dashboard/shell/문제영역';
import 풀이영역 from 'components/containers/dashboard/shell/풀이영역';
import 출력영역 from 'components/containers/dashboard/shell/출력영역';
// hooks
import useMetaData from 'hooks/commons/useMetaData';

/** 문제 수정 페이지 */
const DashBoard = () => {
  const { query } = useRouter();
  const problemId = parseInt(query.problemId as string, 10);

  const queryStr = useRef('');

  const { MetaTitle } = useMetaData();

  const onChangeValue = value => {
    queryStr.current = value;
  };

  return (
    <>
      <MetaTitle content="문제" />

      <Wrapper>
        <TopWrapper>
          <Breadcrumb />
        </TopWrapper>

        <ShellWrapper>
          <ResizableArea
            left={<문제영역 problemId={problemId} />}
            top={<풀이영역 onChangeValue={onChangeValue} />}
            bottom={<출력영역 problemId={problemId} getUserQuery={() => queryStr.current} />}
          />
        </ShellWrapper>
      </Wrapper>
    </>
  );
};

DashBoard.getLayout = page => {
  return (
    <Layout isSide>
      <Sidebar />
      {page}
    </Layout>
  );
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

export default DashBoard;

import styled from 'styled-components';
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

/** 대시보드 페이지 */
const DashBoard = () => {
  const { MetaTitle } = useMetaData();

  return (
    <>
      <MetaTitle content="대시보드" />

      <Wrapper>
        <TopWrapper>
          <Breadcrumb />
        </TopWrapper>

        <ShellWrapper>
          <ResizableArea left={<문제영역 />} top={<풀이영역 />} bottom={<출력영역 />} />
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
  border-top: 1px solid ${({ theme }) => theme.background.bg4};
`;

export default DashBoard;

import styled from 'styled-components';
// components
import Layout from 'components/layouts';
import { MainLayout } from 'sjds/layouts';
import Sidebar from 'components/containers/Sidebar';
import Breadcrumb from 'components/containers/dashboard/Breadcrumb';
import ResizableArea from 'components/containers/dashboard/ResizableArea';
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
          <ResizableArea left={null} top={null} bottom={null} />
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
`;

const ShellWrapper = styled.div`
  flex: 1;
  border-top: 1px solid ${({ theme }) => theme.background.bg4};
`;

export default DashBoard;

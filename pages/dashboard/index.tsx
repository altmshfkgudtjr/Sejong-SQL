import styled from 'styled-components';
// components
import Layout from 'components/layouts';
import { DashboardLayout } from 'sjds/layouts';
import Sidebar from 'components/containers/Sidebar';
import Breadcrumb from 'components/containers/dashboard/Breadcrumb';
import TopMessage from 'components/presenters/dashboard/TopMessage';
// hooks
import useMetaData from 'hooks/commons/useMetaData';

/** 대시보드 페이지 */
const DashBoard = () => {
  const { MetaTitle } = useMetaData();

  return (
    <>
      <MetaTitle content="대시보드" />

      <Wrapper>
        <Breadcrumb />
        <TopMessage message="환영합니다!" />
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

const Wrapper = styled(DashboardLayout)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 8px;
`;

export default DashBoard;

import styled from 'styled-components';
// components
import Layout from 'components/layouts';
import { DashboardLayout } from 'sjds/layouts';
import Sidebar from 'components/containers/Sidebar';
// hooks
import useMetaData from 'hooks/commons/useMetaData';

/** 통계 페이지 */
const AnalyticsPage = () => {
  const { MetaTitle } = useMetaData();

  return (
    <>
      <MetaTitle content="분석" />

      <Wrapper></Wrapper>
    </>
  );
};

AnalyticsPage.getLayout = page => {
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

export default AnalyticsPage;

import styled from 'styled-components';
// components
import Layout from 'components/layouts';
import { DashboardLayout } from 'sjds/layouts';
import Sidebar from 'components/containers/Sidebar';
// hooks
import useMetaData from 'hooks/commons/useMetaData';

/** 주차 생성 페이지 */
const WeekCreatePage = () => {
  const { MetaTitle } = useMetaData();

  return (
    <>
      <MetaTitle content="주차 생성" />

      <Wrapper></Wrapper>
    </>
  );
};

WeekCreatePage.getLayout = page => {
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

export default WeekCreatePage;

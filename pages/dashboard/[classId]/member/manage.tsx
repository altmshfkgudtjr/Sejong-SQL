import styled from 'styled-components';
// components
import Layout from 'components/layouts';
import { DashboardLayout } from 'sjds/layouts';
import Sidebar from 'components/containers/Sidebar';
// hooks
import useMetaData from 'hooks/commons/useMetaData';

/** 분반 학생 관리 페이지 */
const ClassMemberManagePage = () => {
  const { MetaTitle } = useMetaData();

  return (
    <>
      <MetaTitle content="분반 학생 관리" />

      <Wrapper></Wrapper>
    </>
  );
};

ClassMemberManagePage.getLayout = page => {
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

export default ClassMemberManagePage;

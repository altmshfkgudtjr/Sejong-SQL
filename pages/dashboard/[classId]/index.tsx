import styled from 'styled-components';
import { useRouter } from 'next/router';
// components
import Layout from 'components/layouts';
import { DashboardLayout } from 'sjds/layouts';
import Sidebar from 'components/containers/Sidebar';
import Breadcrumb from 'components/containers/dashboard/Breadcrumb';
import TopMessage from 'components/presenters/dashboard/TopMessage';
import WeekList from 'components/containers/dashboard/WeekList';
// hooks
import useMetaData from 'hooks/commons/useMetaData';

/** 클래스 페이지 */
const DashBoard = () => {
  const { query } = useRouter();
  const { MetaTitle } = useMetaData();

  return (
    <>
      <MetaTitle content="대시보드" />

      <Wrapper>
        <Breadcrumb />
        <TopMessage message="주차를 생성할 수 있어요!" />
        <WeekList classId={query.classId as string} />
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

import styled from 'styled-components';
import { useRouter } from 'next/router';
// components
import Layout from 'components/layouts';
import { DashboardLayout } from 'sjds/layouts';
import Sidebar from 'components/containers/Sidebar';
import Breadcrumb from 'components/containers/dashboard/Breadcrumb';
import TopMessage from 'components/presenters/dashboard/TopMessage';
import ProblemList from 'components/containers/dashboard/ProblemList';
// hooks
import useMetaData from 'hooks/commons/useMetaData';

/** 주차별 페이지 */
const WeekPage = () => {
  const { query } = useRouter();
  const { MetaTitle } = useMetaData();

  return (
    <>
      <MetaTitle content="대시보드" />

      <Wrapper>
        <Breadcrumb />
        <TopMessage message="문제를 클릭하시면 수정할 수 있어요" />
        <ProblemList classId={query.classId as string} weekId={query.weekId as string} />
      </Wrapper>
    </>
  );
};

WeekPage.getLayout = page => {
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

export default WeekPage;

import styled, { useTheme } from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
// components
import Layout from 'components/layouts';
import { DashboardLayout } from 'sjds/layouts';
import { TextButton } from 'sjds/components/buttons';
import Sidebar from 'components/containers/Sidebar';
import Breadcrumb from 'components/containers/dashboard/Breadcrumb';
import TopMessage from 'components/presenters/dashboard/TopMessage';
import WeekList from 'components/containers/dashboard/WeekList';
// hooks
import useMetaData from 'hooks/commons/useMetaData';

/** 분반 페이지 */
const ClassPage = () => {
  const { query } = useRouter();
  const { classId } = query;
  const { MetaTitle } = useMetaData();
  const currentTheme = useTheme();

  /** 관리자 여부 */
  const isManager = true;

  return (
    <>
      <MetaTitle content="분반" />

      <Wrapper>
        <Breadcrumb />

        {isManager && (
          <ManagerWrapper>
            <TopMessage message="주차를 생성할 수 있어요" />
            <ButtonWrapper>
              <Link href={`/dashboard/${classId}/edit`} passHref>
                <Button as="a" size="Regular" color={currentTheme.semantic.info}>
                  분반 수정하기
                </Button>
              </Link>

              <Link href={`/dashboard/${classId}/week/new`} passHref>
                <Button as="a" size="Regular" color={currentTheme.semantic.info}>
                  주차 추가하기
                </Button>
              </Link>
            </ButtonWrapper>
          </ManagerWrapper>
        )}

        <WeekList classId={classId as string} />
      </Wrapper>
    </>
  );
};

ClassPage.getLayout = page => {
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

const ManagerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Button = styled(TextButton)`
  flex: 0 1 auto;
`;

export default ClassPage;

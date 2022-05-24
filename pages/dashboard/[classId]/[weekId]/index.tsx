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
import ProblemList from 'components/containers/dashboard/ProblemList';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import * as useClassController from 'hooks/controllers/useClassController';
import * as useProblemController from 'hooks/controllers/useProblemController';

/** 주차별 페이지 */
const WeekPage = () => {
  const { query } = useRouter();
  const { classId, weekId } = query;

  const currentTheme = useTheme();
  const { MetaTitle } = useMetaData();
  const { status, data } = useProblemController.GetProblemList(parseInt(weekId as string, 10));
  const { data: classData } = useClassController.GetClass(parseInt(classId as string, 10));

  /** 관리자 여부 */
  const isManager = classData?.result?.type === 'Super Admin';

  return (
    <>
      <MetaTitle content="주차" />

      <Wrapper>
        <Breadcrumb />

        {isManager && (
          <ManagerWrapper>
            <TopMessage message="문제를 생성할 수 있어요" />
            <ButtonWrapper>
              <Link href={`/dashboard/${classId}/${weekId}/edit`} passHref>
                <Button as="a" size="Regular" color={currentTheme.semantic.info}>
                  주차 수정하기
                </Button>
              </Link>

              <Link href={`/dashboard/${classId}/${weekId}/problem/new`} passHref>
                <Button as="a" size="Regular" color={currentTheme.semantic.info}>
                  문제 추가하기
                </Button>
              </Link>
            </ButtonWrapper>
          </ManagerWrapper>
        )}

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

export default WeekPage;

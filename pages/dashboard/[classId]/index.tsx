import styled, { useTheme } from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
// components
import Layout from 'components/layouts';
import { DashboardLayout } from 'sjds/layouts';
import { TextButton, FillButton } from 'sjds/components/buttons';
import Breadcrumb from 'components/containers/dashboard/Breadcrumb';
import TopMessage from 'components/presenters/dashboard/TopMessage';
import WeekList from 'components/containers/dashboard/WeekList';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import * as useClassController from 'hooks/controllers/useClassController';
// styles
import { animations } from 'sjds';

/** 분반 페이지 */
const ClassPage = () => {
  const router = useRouter();
  const classId = parseInt(router.query.classId as string, 10);

  const currentTheme = useTheme();
  const { MetaTitle } = useMetaData();
  const { data: classData } = useClassController.GetClass(classId);

  /** 관리자 여부 */
  const isManager = classData?.result?.type === 'prof' || classData?.result?.type === 'ta';

  return (
    <>
      <MetaTitle content="분반" />

      <Wrapper>
        <TopWrapper>
          <Breadcrumb />
          <Link href={`/dashboard/${classId}/analytics`} passHref>
            <AnalyticsButton as="a" size="Small" color={currentTheme.semantic.info}>
              통계
            </AnalyticsButton>
          </Link>
        </TopWrapper>

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

        <WeekList classId={classId} />
      </Wrapper>
    </>
  );
};

ClassPage.getLayout = page => {
  return <Layout isSide>{page}</Layout>;
};

const Wrapper = styled(DashboardLayout)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 8px;
`;

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
`;

const ManagerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: 0.4s ease ${animations.fadeIn};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Button = styled(TextButton)`
  flex: 0 1 auto;
`;

const AnalyticsButton = styled(FillButton)`
  flex: 0 1 auto;
  width: 100px;
`;

export default ClassPage;

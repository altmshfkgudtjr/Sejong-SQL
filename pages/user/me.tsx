import styled, { useTheme } from 'styled-components';
import { useState, useLayoutEffect } from 'react';
import { parseISO, differenceInDays } from 'date-fns';
// components
import { MainLayout } from 'sjds/layouts';
import { FillButton, TextButton } from 'sjds/components/buttons';
import Layout from 'components/layouts';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useModal from 'hooks/dom/useModal';
import * as useUserController from 'hooks/controllers/useUserController';
// styles
import { typo } from 'sjds';

/** 마이페이지 */
const MyPage = () => {
  const currentTheme = useTheme();
  const { MetaTitle } = useMetaData();
  const { pushModal } = useModal();

  const { data: userData } = useUserController.GetProfile();

  const [lastPasswordUpdatedAt, setLastPasswordUpdatedAt] = useState('');

  const onChangeName = () => pushModal({ name: 'ChangeNameModal' });

  const onChangePassword = () => pushModal({ name: 'ChangePasswordModal' });

  const onCertifyUniv = () => pushModal({ name: 'CertifyUnivModal' });

  const onLogout = () => {
    window.sessionStorage.removeItem('ssql-accessToken');
    window.localStorage.removeItem('ssql-accessToken');
    window.sessionStorage.removeItem('ssql-refreshToken');
    window.localStorage.removeItem('ssql-refreshToken');
    window.location.href = '/';
  };

  const onSecession = () => pushModal({ name: 'SecessionModal' });

  useLayoutEffect(() => {
    if (!userData?.result?.pw_updated_at) {
      return;
    }

    const changedDate = parseISO(userData.result.pw_updated_at);
    const diffDays = differenceInDays(new Date(), changedDate);
    setLastPasswordUpdatedAt(`${diffDays}일 전`);
  }, [userData]);

  return (
    <>
      <MetaTitle content="마이페이지" />

      <Wrapper>
        <GreetingMessage>
          반갑습니다!&nbsp;
          {userData?.result?.sejong_id ? (
            <>
              <mark>{userData?.result?.sejong_id}</mark>님
            </>
          ) : (
            <>
              <mark>{userData?.result?.name.toUpperCase()}</mark>님
            </>
          )}
          &nbsp; 🌻
        </GreetingMessage>

        <ProfileSection>
          <Row>
            <h2>이름</h2>
            <div>
              <span>{userData?.result?.name}</span>
              <FillButton onClick={onChangeName} size="Regular" color={currentTheme.semantic.info}>
                이름 변경하기
              </FillButton>
            </div>
          </Row>

          <Row>
            <h2>비밀번호</h2>
            <div>
              <span>마지막 변경일자 {lastPasswordUpdatedAt}</span>
              <FillButton
                onClick={onChangePassword}
                size="Regular"
                color={currentTheme.semantic.info}
              >
                비밀번호 변경하기
              </FillButton>
            </div>
          </Row>

          <Row>
            <h2>세종대학교 구성원</h2>
            <div>
              <span>{userData?.result?.sejong_id ? '인증되었습니다' : '인증이 필요합니다'}</span>
              <FillButton
                onClick={onCertifyUniv}
                disabled={!!userData?.result?.sejong_id}
                size="Regular"
                color={currentTheme.semantic.info}
              >
                인증하기
              </FillButton>
            </div>
          </Row>

          <Row>
            <h2>계정</h2>
            <div>
              <FillButton onClick={onLogout} size="Regular" color={currentTheme.semantic.danger}>
                로그아웃
              </FillButton>
            </div>
          </Row>

          <SecessionButton
            onClick={onSecession}
            size="Regular"
            color={currentTheme.semantic.danger}
          >
            탈퇴하기
          </SecessionButton>
        </ProfileSection>
      </Wrapper>
    </>
  );
};

const Wrapper = styled(MainLayout)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const GreetingMessage = styled.p`
  margin-top: 64px;
  margin-bottom: 80px;
  ${typo.Big1};
  font-weight: 600;
  color: ${({ theme }) => theme.text.f2};

  mark {
    margin-right: 4px;
    font-weight: 700;
    color: ${({ theme }) => theme.semantic.success};
  }
`;

const ProfileSection = styled.section`
  width: 100%;
  margin-bottom: 48px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 16px 0;
  border-top: 1px solid ${({ theme }) => theme.border.b2};

  & > h2 {
    ${typo.subtitle1};
    color: ${({ theme }) => theme.text.f2};
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 32px;
  }

  span {
    ${typo.body2};
    color: ${({ theme }) => theme.text.f4};
  }

  button {
    width: 140px;
  }

  &:last-of-type {
    border-bottom: 1px solid ${({ theme }) => theme.border.b2};
  }
`;

const SecessionButton = styled(TextButton)`
  margin-top: 16px;
  margin-left: auto;
`;

MyPage.getLayout = page => {
  return <Layout>{page}</Layout>;
};

export default MyPage;

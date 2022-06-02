import styled, { useTheme } from 'styled-components';
import Router from 'next/router';
import { useRef } from 'react';
// components
import { FillButton } from 'sjds/components/buttons';
import TextInput from 'components/atoms/inputs/Text';
// hooks
import useSnackbar from 'hooks/dom/useSnackbar';
import * as useUserController from 'hooks/controllers/useUserController';
// styles
import { boxShadow, mediaQuery, typo } from 'sjds';

/** 회원탈퇴 모달 */
const SecessionModal = ({ onCloseModal }) => {
  const currentTheme = useTheme();

  const pwRef = useRef<HTMLInputElement>(null);
  const { mutate: seccessionMutate } = useUserController.Seccession();

  const { initSnackbar } = useSnackbar();

  const onLogout = () => {
    window.sessionStorage.removeItem('ssql-accessToken');
    window.localStorage.removeItem('ssql-accessToken');
    window.sessionStorage.removeItem('ssql-refreshToken');
    window.localStorage.removeItem('ssql-refreshToken');
    window.location.href = '/sign-in';
  };

  const onSubmit = () => {
    if (!pwRef.current?.value) {
      initSnackbar({
        type: 'Warning',
        title: 'WARNING',
        message: '현재 비밀번호를 입력해주세요',
      });
      return;
    }

    seccessionMutate(
      {
        data: {
          pw: pwRef.current.value,
        },
      },
      {
        onSuccess: () => {
          alert('회원탈퇴가 정상적으로 진행되었습니다.');
          onLogout();
          onCloseModal();
          Router.push(`/`);
        },
      },
    );
  };

  return (
    <Wrapper>
      <Title>회원 탈퇴</Title>
      <TextInput ref={pwRef} placeholder="기존 비밀번호를 입력해주세요" autoFocus />
      <ButtonWrapper>
        <FillButton size="Regular" color={currentTheme.background.bg5} onClick={onCloseModal}>
          취소하기
        </FillButton>
        <FillButton size="Regular" color={currentTheme.semantic.danger} onClick={onSubmit}>
          탈퇴하기
        </FillButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.dialog`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  padding: 32px 20px;
  background-color: ${({ theme }) => theme.background.bg2};
  ${boxShadow.e2};

  ${mediaQuery.medium} {
    width: 400px;
    height: 240px;
    max-height: 100%;
    border-radius: 12px;
  }
`;

const Title = styled.h1`
  ${typo.headline1};
  color: ${({ theme }) => theme.semantic.danger};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export default SecessionModal;

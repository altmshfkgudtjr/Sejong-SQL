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

/** 비밀번호 변경 모달 */
const ChangePasswordModal = ({ onCloseModal }) => {
  const currentTheme = useTheme();

  const oldRef = useRef<HTMLInputElement>(null);
  const newRef = useRef<HTMLInputElement>(null);

  const { refetch: profileRefetch } = useUserController.GetProfile();
  const { mutate: updateMutate } = useUserController.UpdateProfile();

  const { initSnackbar } = useSnackbar();

  const onLogout = () => {
    window.sessionStorage.removeItem('ssql-accessToken');
    window.localStorage.removeItem('ssql-accessToken');
    window.sessionStorage.removeItem('ssql-refreshToken');
    window.localStorage.removeItem('ssql-refreshToken');
    window.location.href = '/sign-in';
  };

  // TODO 비밀번호 영문 대소문자, 숫자 조합 조건 추가하기
  // TODO 비밀번호 특수문자 제한 조건 추가하기
  // 허용하는 특수문자: `~!@#$%^&*()-_=+
  const onSubmit = () => {
    if (!oldRef.current?.value) {
      initSnackbar({
        type: 'Warning',
        title: 'WARNING',
        message: '기존 비밀번호를 입력해주세요',
      });
      return;
    }

    if (!newRef.current?.value) {
      initSnackbar({
        type: 'Warning',
        title: 'WARNING',
        message: '새로운 비밀번호를 입력해주세요',
      });
      return;
    }

    updateMutate(
      {
        data: {
          old_pw: oldRef.current.value,
          new_pw: newRef.current.value,
        },
      },
      {
        onSuccess: () => {
          alert('비밀번호가 새롭게 변경되었습니다. 다시 로그인 해주세요!');
          onLogout();
          profileRefetch();
          onCloseModal();
          Router.push(`/sign-in`);
        },
      },
    );
  };

  return (
    <Wrapper>
      <Title>비밀번호 변경</Title>
      <TextInput
        ref={oldRef}
        type="password"
        placeholder="기존 비밀번호를 입력해주세요"
        autoFocus
      />
      <TextInput ref={newRef} type="password" placeholder="새로운 비밀번호를 입력해주세요" />
      <ButtonWrapper>
        <FillButton size="Regular" color={currentTheme.background.bg5} onClick={onCloseModal}>
          취소하기
        </FillButton>
        <FillButton size="Regular" color={currentTheme.primary} onClick={onSubmit}>
          변경하기
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
    height: 340px;
    max-height: 100%;
    border-radius: 12px;
  }
`;

const Title = styled.h1`
  ${typo.headline1};
  color: ${({ theme }) => theme.text.f2};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export default ChangePasswordModal;

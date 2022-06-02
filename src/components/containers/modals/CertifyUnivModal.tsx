import styled, { useTheme } from 'styled-components';
import { useRef } from 'react';
// components
import { FillButton } from 'sjds/components/buttons';
import TextInput from 'components/atoms/inputs/Text';
// hooks
import useSnackbar from 'hooks/dom/useSnackbar';
import * as useUserController from 'hooks/controllers/useUserController';
// styles
import { boxShadow, mediaQuery, typo } from 'sjds';

/** 세종대학교 구성원 인증 모달 */
const CertifyUnivModal = ({ onCloseModal }) => {
  const currentTheme = useTheme();

  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const { refetch: profileRefetch } = useUserController.GetProfile();
  const { mutate: authMutate } = useUserController.AuthorizationSejongUniv();

  const { initSnackbar } = useSnackbar();

  const onSubmit = () => {
    if (!idRef.current?.value) {
      initSnackbar({
        type: 'Warning',
        title: 'WARNING',
        message: '세종대학교 학번 및 사번을 입력해주세요',
      });
      return;
    }

    if (!pwRef.current?.value) {
      initSnackbar({
        type: 'Warning',
        title: 'WARNING',
        message: '세종대학교 계정에 맞는 비밀번호를 입력해주세요',
      });
      return;
    }

    authMutate(
      {
        data: {
          sejong_id: idRef.current.value,
          sejong_pw: pwRef.current.value,
        },
      },
      {
        onSuccess: () => {
          initSnackbar({
            type: 'Success',
            title: 'SUCCESS',
            message: '세종대학교 구성원 인증이 완료되었습니다',
          });
          profileRefetch();
          onCloseModal();
        },
        onError: () => {
          initSnackbar({
            type: 'Danger',
            title: 'ERROR',
            message: '세종대학교 구성원 인증에 실패하였습니다',
          });
        },
      },
    );
  };

  return (
    <Wrapper>
      <Title>세종대학교 구성원 인증</Title>
      <TextInput
        ref={idRef}
        type="text"
        placeholder="세종대학교 학번 및 사번을 입력해주세요"
        autoFocus
      />
      <TextInput ref={pwRef} type="password" placeholder="세종대학교 비밀번호를 입력해주세요" />
      <ButtonWrapper>
        <FillButton size="Regular" color={currentTheme.background.bg5} onClick={onCloseModal}>
          취소하기
        </FillButton>
        <FillButton size="Regular" color={currentTheme.primary} onClick={onSubmit}>
          인증하기
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

export default CertifyUnivModal;

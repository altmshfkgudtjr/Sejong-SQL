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

/** 이름 변경 모달 */
const ChangeNameModal = ({ onCloseModal }) => {
  const currentTheme = useTheme();

  const nameRef = useRef<HTMLInputElement>(null);

  const { data: userData, refetch: profileRefetch } = useUserController.GetProfile();
  const { mutate: updateMutate } = useUserController.UpdateProfile();

  const { initSnackbar } = useSnackbar();

  const onSubmit = () => {
    if (!nameRef.current?.value) {
      initSnackbar({
        type: 'Warning',
        title: 'WARNING',
        message: '이름을 입력해주세요',
      });
      return;
    }

    updateMutate(
      {
        data: {
          name: nameRef.current.value,
        },
      },
      {
        onSuccess: () => {
          initSnackbar({
            type: 'Success',
            title: 'SUCCESS',
            message: '이름이 새롭게 변경되었습니다',
          });
          profileRefetch();
          onCloseModal();
        },
      },
    );
  };

  return (
    <Wrapper>
      <Title>이름 변경</Title>
      <TextInput
        ref={nameRef}
        placeholder="이름을 입력해주세요"
        defaultValue={userData?.result?.name}
        autoFocus
      />
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
    height: 240px;
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

export default ChangeNameModal;

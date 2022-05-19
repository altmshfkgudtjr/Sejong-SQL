import styled, { useTheme } from 'styled-components';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
// components
import Layout from 'components/layouts';
import Symbol from 'components/atoms/Symbol';
import Logo from 'components/atoms/Logo';
import TextInput from 'components/atoms/inputs/Text';
import PasswordInput from 'components/atoms/inputs/Password';
import CheckBox from 'components/atoms/inputs/Checkbox';
import { FillButton } from 'sjds/components/buttons';
// store
import { themeState } from 'store/system/theme';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useSnackbar from 'hooks/dom/useSnackbar';
import * as useUserController from 'hooks/controllers/useUserController';
// styles
import { typo } from 'sjds';

/** 로그인 페이지 */
const SignInPage = () => {
  const [isChecked, setIsChecked] = useState(true);

  const id = useRef<HTMLInputElement>(null);
  const pw = useRef<HTMLInputElement>(null);

  const { MetaTitle } = useMetaData();
  const currentTheme = useTheme();
  const router = useRouter();
  const { initSnackbar } = useSnackbar();

  const currentThemeState = useRecoilValue(themeState);
  const { mutate, status } = useUserController.SignIn(isChecked);

  const onChangeCheckBox = () => setIsChecked(v => !v);

  const onBack = () => router.back();

  const onSignIn = () => {
    if (status === 'loading') {
      return;
    }

    if (!id.current || !pw.current) {
      return;
    }

    if (id.current.value === '') {
      initSnackbar({ type: 'Warning', title: '아이디 입력', message: '올바른 값을 입력해주세요' });
      return id.current.focus();
    }

    if (pw.current.value === '') {
      initSnackbar({
        type: 'Warning',
        title: '비밀번호 입력',
        message: '올바른 값을 입력해주세요',
      });
      return pw.current.focus();
    }

    mutate({
      data: {
        id: id.current.value,
        pw: pw.current.value,
      },
    });
  };

  const onKeyDown = e => {
    if (e.code === 'Enter') {
      onSignIn();
    }
  };

  useEffect(() => {
    switch (status) {
      case 'error':
        initSnackbar({
          type: 'Danger',
          title: '서버와의 연결 오류',
          message: '잠시 후 다시 시도해주세요',
        });
        break;

      case 'success':
        window.location.href = '/';
        break;
    }
  }, [status, initSnackbar]);

  return (
    <>
      <MetaTitle content="로그인" />

      <Wrapper>
        <BrandWrapper>
          <Symbol type="Color" w={48} h={48} isBackground />
          <Logo type={currentThemeState.mode === 'Dark' ? 'White' : 'Black'} h={18} />
        </BrandWrapper>
        <Title>로그인</Title>
        <FormWrapper>
          <TextInput
            ref={id}
            placeholder="아이디"
            autoComplete="off"
            autoFocus
            onKeyDown={onKeyDown}
          />
          <PasswordInput ref={pw} placeholder="비밀번호" autoComplete="off" onKeyDown={onKeyDown} />
          <CheckBox
            label="password-persist"
            message="로그인 상태 유지"
            checked={isChecked}
            onChange={onChangeCheckBox}
          />
        </FormWrapper>
        <ButtonWrapper>
          <FillButton size="Regular" color={currentTheme.background.bg5} onClick={onBack}>
            돌아가기
          </FillButton>
          <FillButton
            size="Regular"
            color={currentTheme.primary}
            onClick={status === 'loading' ? undefined : onSignIn}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? '진입 중' : '로그인'}
          </FillButton>
        </ButtonWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 60px - 100px);
`;

const BrandWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  ${typo.headline1};
  margin: 40px auto 50px;
  color: ${({ theme }) => theme.text.f2};
`;

const FormWrapper = styled.div`
  margin-bottom: 40px;

  & > div {
    width: 320px;
  }

  & > div:not(:first-of-type) {
    margin-top: 24px;
  }

  & > div:last-of-type {
    margin-bottom: 16px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 320px;

  & > button {
    flex: 1;
  }
`;

SignInPage.getLayout = page => {
  return <Layout>{page}</Layout>;
};

export default SignInPage;

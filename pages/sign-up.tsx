import styled, { useTheme } from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
// components
import Layout from 'components/layouts';
import Symbol from 'components/atoms/Symbol';
import Logo from 'components/atoms/Logo';
import TextInput from 'components/atoms/inputs/Text';
import PasswordInput from 'components/atoms/inputs/Password';
import { FillButton } from 'sjds/components/buttons';
import AgreementSection from 'components/presenters/auth/AgreementSection';
// store
import { themeState } from 'store/system/theme';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useSnackbar from 'hooks/dom/useSnackbar';
import * as useUserController from 'hooks/controllers/useUserController';
// styles
import { typo } from 'sjds';

/** 회원가입 페이지 */
const SignUpPage = () => {
  const [isChecked, setIsChecked] = useState(false);

  const id = useRef<HTMLInputElement>(null);
  const pw = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);

  const { MetaTitle } = useMetaData();
  const currentTheme = useTheme();
  const router = useRouter();
  const { initSnackbar } = useSnackbar();

  const currentThemeState = useRecoilValue(themeState);
  const { mutate, status } = useUserController.SignUp();

  const onSignUp = async () => {
    if (status === 'loading') {
      return;
    }

    if (!id.current || !name.current || !pw.current) {
      return;
    }

    if (id.current.value === '') {
      initSnackbar({ type: 'Warning', title: '아이디 입력', message: '올바른 값을 입력해주세요' });
      return id.current.focus();
    } else if (id.current.value.length < 4) {
      initSnackbar({
        type: 'Warning',
        title: '아이디 입력',
        message: '최소 4글자 이상 입력해주세요',
      });
      return id.current.focus();
    }

    if (name.current.value === '') {
      initSnackbar({ type: 'Warning', title: '이름 입력', message: '올바른 값을 입력해주세요' });
      return name.current.focus();
    }

    const re = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,20}$/;

    if (pw.current.value === '') {
      initSnackbar({
        type: 'Warning',
        title: '비밀번호 입력',
        message: '올바른 값을 입력해주세요',
      });
      return pw.current.focus();
    } else if (pw.current.value.length < 8) {
      initSnackbar({
        type: 'Warning',
        title: '비밀번호 입력',
        message: '최소 8글자 이상 입력해주세요',
      });
      return pw.current.focus();
    } else if (!re.test(pw.current.value)) {
      initSnackbar({
        type: 'Warning',
        title: '비밀번호 입력',
        message: '영문 대소문자, 숫자의 조합이어야 합니다',
      });
      return pw.current.focus();
    }

    mutate({
      data: {
        id: id.current.value,
        name: name.current.value,
        pw: pw.current.value,
      },
    });
  };

  const onKeyDown = e => {
    if (e.code === 'Enter') {
      onSignUp();
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
        initSnackbar({
          type: 'Success',
          title: '회원가입 성공',
          message: '환영합니다! 가입한 계정으로 다시 한번 로그인해주세요',
        });
        router.push('/sign-in');
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, initSnackbar]);

  return (
    <>
      <MetaTitle content="회원가입" />

      <Wrapper>
        <BrandWrapper>
          <Symbol type="Color" w={48} h={48} isBackground />
          <Logo type={currentThemeState.mode === 'Dark' ? 'White' : 'Black'} w={150} h={18} />
        </BrandWrapper>
        <Title>회원가입</Title>
        {!isChecked && <AgreementSection onRead={() => setIsChecked(true)} />}
        {isChecked && (
          <>
            <FormWrapper>
              <TextInput
                ref={id}
                placeholder="아이디 (4자리 이상)"
                autoComplete="off"
                maxLength={20}
                autoFocus
                onKeyDown={onKeyDown}
              />
              <TextInput ref={name} placeholder="이름" autoComplete="off" onKeyDown={onKeyDown} />
              <PasswordInput
                ref={pw}
                placeholder="비밀번호 (8자리 이상)"
                autoComplete="off"
                onKeyDown={onKeyDown}
              />
            </FormWrapper>
            <ButtonWrapper>
              <FillButton
                size="Regular"
                color={currentTheme.background.bg5}
                onClick={() => setIsChecked(false)}
              >
                돌아가기
              </FillButton>
              <FillButton
                size="Regular"
                color={currentTheme.primary}
                onClick={status === 'loading' ? undefined : onSignUp}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? '등록 중' : '계속하기'}
              </FillButton>
            </ButtonWrapper>
          </>
        )}
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

SignUpPage.getLayout = page => {
  return <Layout>{page}</Layout>;
};

export default SignUpPage;

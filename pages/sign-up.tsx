import styled, { useTheme } from 'styled-components';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
// components
import Layout from 'components/layouts';
import Symbol from 'components/atoms/Symbol';
import Logo from 'components/atoms/Logo';
import TextInput from 'components/atoms/inputs/Text';
import PasswordInput from 'components/atoms/inputs/Password';
import { FillButton, TextButton } from 'sjds/components/buttons';
import 개인정보처리방침 from 'components/presenters/auth/개인정보처리방침';
// styles
import { typo } from 'sjds';

/** 회원가입 페이지 */
const SignUpPage = () => {
  const [isChecked, setisChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentTheme = useTheme();
  const router = useRouter();

  const scrollTarget = useRef<HTMLDivElement | null>(null);

  const onBack = () => router.back();

  const onScrollAgreement = () => {
    if (!scrollTarget.current) {
      return;
    }

    scrollTarget.current.scrollBy({
      top: 2000,
      left: 0,
      behavior: 'smooth',
    });
  };

  const onSignIn = async () => {
    setIsLoading(true);
    // await ...
    // setIsLoading(false);
  };

  return (
    <Wrapper>
      <BrandWrapper>
        <Symbol type="Color" w={48} h={48} isBackground />
        <Logo type="Black" h={18} />
      </BrandWrapper>
      <Title>회원가입</Title>
      {!isChecked && (
        <>
          <AgreementLayout>
            <AgreementWrapper ref={scrollTarget}>
              <개인정보처리방침 />
            </AgreementWrapper>
          </AgreementLayout>
          <ScrollButton
            size="Regular"
            color={currentTheme.semantic.info}
            onClick={onScrollAgreement}
          >
            스크롤 내리기
          </ScrollButton>
          <ButtonWrapper>
            <FillButton size="Regular" color={currentTheme.background.bg5} onClick={onBack}>
              돌아가기
            </FillButton>
            <FillButton
              size="Regular"
              color={currentTheme.primary}
              onClick={() => setisChecked(true)}
              disabled={isLoading}
            >
              동의 및 진행
            </FillButton>
          </ButtonWrapper>
        </>
      )}
      {isChecked && (
        <>
          <FormWrapper>
            <TextInput placeholder="학번 또는 사번 (Email ID)" autoComplete="off" autoFocus />
            <TextInput placeholder="이름" autoComplete="off" />
            <PasswordInput placeholder="비밀번호" autoComplete="off" />
          </FormWrapper>
          <ButtonWrapper>
            <FillButton
              size="Regular"
              color={currentTheme.background.bg5}
              onClick={() => setisChecked(false)}
            >
              돌아가기
            </FillButton>
            <FillButton
              size="Regular"
              color={currentTheme.primary}
              onClick={isLoading ? undefined : onSignIn}
              disabled={isLoading}
            >
              {isLoading ? '잠시만요!' : '계속하기'}
            </FillButton>
          </ButtonWrapper>
        </>
      )}
    </Wrapper>
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
  margin: 50px auto 60px;
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

const ScrollButton = styled(TextButton)`
  flex: 0 0 auto;
  width: 320px;
  margin-bottom: 16px;
`;

const AgreementLayout = styled.div`
  width: calc(100% - 32px);
  max-width: 600px;
  max-height: 320px;
  padding: 16px 0;
  margin-bottom: 16px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.background.bg3};
  overflow: hidden;
`;

const AgreementWrapper = styled.div`
  height: 100%;
  padding: 16px 32px;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    width: 6px;
    background-color: ${({ theme }) => theme.border.b2};
    border-radius: 16px;

    &:hover {
      background-color: ${({ theme }) => theme.border.b1};
    }
  }
`;

SignUpPage.getLayout = page => {
  return <Layout>{page}</Layout>;
};

export default SignUpPage;

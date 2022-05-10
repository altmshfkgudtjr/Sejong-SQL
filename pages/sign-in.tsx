import styled, { useTheme } from 'styled-components';
import { useRouter } from 'next/router';
import { useState } from 'react';
// components
import Layout from 'components/layouts';
import Symbol from 'components/atoms/Symbol';
import Logo from 'components/atoms/Logo';
import TextInput from 'components/atoms/inputs/Text';
import PasswordInput from 'components/atoms/inputs/Password';
import CheckBox from 'components/atoms/inputs/Checkbox';
import { FillButton } from 'sjds/components/buttons';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
// styles
import { typo } from 'sjds';

/** 로그인 페이지 */
const SignInPage = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { MetaTitle } = useMetaData();
  const currentTheme = useTheme();
  const router = useRouter();

  const onChangeCheckBox = () => setIsChecked(v => !v);

  const onBack = () => router.back();

  const onSignIn = async () => {
    setIsLoading(true);
    // await ...
    // setIsLoading(false);
  };

  return (
    <>
      <MetaTitle content="로그인" />

      <Wrapper>
        <BrandWrapper>
          <Symbol type="Color" w={48} h={48} isBackground />
          <Logo type="Black" h={18} />
        </BrandWrapper>
        <Title>로그인</Title>
        <FormWrapper>
          <TextInput placeholder="학번 또는 사번 (Email ID)" autoComplete="off" autoFocus />
          <PasswordInput placeholder="비밀번호" autoComplete="off" />
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
            onClick={isLoading ? undefined : onSignIn}
            disabled={isLoading}
          >
            {isLoading ? '잠시만요!' : '로그인'}
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

SignInPage.getLayout = page => {
  return <Layout>{page}</Layout>;
};

export default SignInPage;
import styled from 'styled-components';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
// components
import Symbol from 'components/atoms/Symbol';
import Logo from 'components/atoms/Logo';
import { TextButton } from 'sjds/components/buttons';
// hooks
import * as useUserController from 'hooks/controllers/useUserController';
// store
import { themeState } from 'store/system/theme';
// styles
import { mediaQuery, zIndex } from 'sjds';

const MainHeader = () => {
  const currentTheme = useRecoilValue(themeState);
  const { status, data } = useUserController.GetProfile();

  return (
    <Wrapper>
      <ContentWrapper>
        <div>
          <HomeLink href="/">
            <Symbol type="Color" h={32} isLinking={false} />
            <Logo
              type={currentTheme.mode === 'Dark' ? 'White' : 'Black'}
              h={18}
              isLinking={false}
            />
          </HomeLink>
        </div>
        {status === 'success' && !!data && (
          <div>
            <Link href="/user/me" passHref>
              <TextButton as="a" size="Small">
                {data.result?.name} 님
              </TextButton>
            </Link>
          </div>
        )}
        {status !== 'idle' && status !== 'loading' && !data && (
          <div>
            <Link href="/sign-in" passHref>
              <TextButton as="a" size="Small">
                로그인
              </TextButton>
            </Link>
            <Link href="/sign-up" passHref>
              <TextButton as="a" size="Small">
                회원가입
              </TextButton>
            </Link>
          </div>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.background.bg1};
  z-index: ${zIndex.header};

  ${mediaQuery.large} {
    position: fixed;
    height: 60px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 4px 24px;

  & > div {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  ${mediaQuery.large} {
    padding: 10px 24px;
  }
`;

const HomeLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export default MainHeader;

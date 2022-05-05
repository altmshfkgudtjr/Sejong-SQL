import styled from 'styled-components';
import Link from 'next/link';
// components
import Symbol from 'components/atoms/Symbol';
import Logo from 'components/atoms/Logo';
import { TextButton } from 'sjds/components/buttons';
// styles
import { mediaQuery } from 'sjds';

const MainHeader = () => {
  const isLogined = false;

  return (
    <Wrapper>
      <ContentWrapper>
        <div>
          <HomeLink href="/">
            <Symbol type="Color" h={32} isLinking={false} />
            <Logo type="Black" h={18} isLinking={false} />
          </HomeLink>
        </div>
        {isLogined && (
          <div>
            <TextButton>16011075 님</TextButton>
          </div>
        )}
        {!isLogined && (
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
  display: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.background.bg1};

  ${mediaQuery.large} {
    display: relative;
    height: 60px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

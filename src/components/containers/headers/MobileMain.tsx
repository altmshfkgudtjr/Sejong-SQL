import styled from 'styled-components';
import { useRef } from 'react';
import Link from 'next/link';
// components
import Logo from 'components/atoms/Logo';
import { TextButton } from 'sjds/components/buttons';
import { Icon } from 'sjds/components/icons';
// hooks
import useScrollHeader from 'hooks/dom/useScrollHeader';
// styles
import { margin, mediaQuery, zIndex } from 'sjds';

/** 모바일 메인 헤더 */
const MobileMainHeader = () => {
  const headerRef = useRef(null);
  useScrollHeader(headerRef);

  return (
    <>
      <Wrapper>
        <Header ref={headerRef}>
          <LeftSide>
            <TextButton size="ExtraSmall">
              <Icon name="ic_category" width={32} />
            </TextButton>
            <Logo h={18} />
          </LeftSide>

          <RightSide>
            <Link href="/signin" passHref>
              <TextButton as="a" size="ExtraSmall">
                로그인
              </TextButton>
            </Link>
          </RightSide>
        </Header>
      </Wrapper>

      <HeaderSpace />
    </>
  );
};

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${zIndex.header};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 8px 4px;
  background-color: ${({ theme }) => theme.background.bg1};

  ${mediaQuery.large} {
    padding: 8px 12px;
  }
`;

const LeftSide = styled.div`
  display: flex;

  & button {
    padding: 4px;
    margin-right: 8px;
  }

  & > a:not(:first-of-type) {
    ${margin.horizontal};
  }
`;

const RightSide = styled.div`
  display: flex;

  & > a {
    ${margin.horizontal};
  }
`;

const HeaderSpace = styled.div`
  height: 48px;
`;

export default MobileMainHeader;

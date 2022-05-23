import styled from 'styled-components';
// components
import Sidebar from 'components/containers/Sidebar';
import HeaderLayout from 'components/containers/headers';
import MainHeader from 'components/containers/headers/Main';
import MobileMainHeader from 'components/containers/headers/MobileMain';
// styles
import { mediaQuery } from 'sjds';
// types
import type { ReactNode, PropsWithChildren } from 'react';

/**
 * 메인 레이아웃
 * @param props
 * @param props.false 사이드바 존재 여부
 * @param props.desktopHeader 데스크탑 헤더
 * @param props.mobileHeader 모바일 헤더
 */
const Layout = ({
  isSide = false,
  desktopHeader = <MainHeader />,
  mobileHeader = <MobileMainHeader />,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <>
      <HeaderLayout desktop={desktopHeader} mobile={mobileHeader} />
      <Wrapper isSide={isSide}>
        {isSide && <Sidebar />}
        <Body isSide={isSide}>{children}</Body>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div<{ isSide: boolean }>`
  display: ${({ isSide }) => (isSide ? 'flex' : 'block')};
  align-items: flex-start;
  justify-content: space-between;
  overflow: auto;
`;

const Body = styled.div<{ isSide: boolean }>`
  width: 100%;
  margin-left: auto;

  ${mediaQuery.large} {
    width: ${({ isSide }) => (isSide ? `calc(100% - 320px)` : `100%`)};
    margin-top: 60px;
  }
`;

type Props = {
  isSide?: boolean;
  desktopHeader?: ReactNode;
  mobileHeader?: ReactNode;
};

export default Layout;

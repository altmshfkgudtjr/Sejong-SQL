import styled from 'styled-components';
// components
import HeaderLayout from 'components/containers/headers';
import MainHeader from 'components/containers/headers/Main';
import MobileMainHeader from 'components/containers/headers/MobileMain';
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
      <Wrapper isSide={isSide}>{children}</Wrapper>
    </>
  );
};

const Wrapper = styled.div<{ isSide: boolean }>`
  display: ${({ isSide }) => (isSide ? 'flex' : 'block')};
  align-items: flex-start;
  justify-content: space-between;
`;

type Props = {
  isSide?: boolean;
  desktopHeader?: ReactNode;
  mobileHeader?: ReactNode;
};

export default Layout;

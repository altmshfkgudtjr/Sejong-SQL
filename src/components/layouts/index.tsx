import type { ReactNode, PropsWithChildren } from 'react';
// components
import HeaderLayout from 'components/containers/headers';
import MainHeader from 'components/containers/headers/Main';
import MobileMainHeader from 'components/containers/headers/MobileMain';

/**
 * 메인 레이아웃
 * @param props
 * @param props.desktopHeader 데스크탑 헤더
 * @param props.mobileHeader 모바일 헤더
 */
const Layout = ({
  desktopHeader = <MainHeader />,
  mobileHeader = <MobileMainHeader />,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <>
      <HeaderLayout desktop={desktopHeader} mobile={mobileHeader} />
      {children}
    </>
  );
};

type Props = {
  desktopHeader?: ReactNode;
  mobileHeader?: ReactNode;
};

export default Layout;

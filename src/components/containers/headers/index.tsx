import type { ReactNode } from 'react';
import styled from 'styled-components';
// styles
import { mediaQuery } from 'sjds';

/**
 * 헤더 레이아웃
 * @param props
 * @param props.desktop
 * @param props.mobile
 */
const HeaderLayout = ({ desktop, mobile }: Props) => {
  return (
    <>
      <Desktop>{desktop}</Desktop>
      <Mobile>{mobile}</Mobile>
    </>
  );
};

const Desktop = styled.div`
  display: none;

  ${mediaQuery.medium} {
    display: block;
  }
`;

const Mobile = styled.div`
  display: block;

  ${mediaQuery.medium} {
    display: none;
  }
`;

type Props = {
  desktop: ReactNode;
  mobile: ReactNode;
};

export default HeaderLayout;

import styled from 'styled-components';
// styles
import { mediaValue, mediaQuery } from 'sjds';

/**
 * 메인 레이아웃
 */
const MainLayout = styled.div`
  padding: 0 16px;
  margin: auto;

  ${mediaQuery.medium} {
    padding: 0 20px;
  }
  ${mediaQuery.large} {
    max-width: ${mediaValue.large}px;
    padding: 0 20px;
  }
`;

export default MainLayout;

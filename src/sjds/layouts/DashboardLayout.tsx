import styled from 'styled-components';
// styles
import { mediaQuery } from 'sjds';

/**
 * 대시보드 레이아웃
 */
const DashboardLayout = styled.div`
  padding: 0 16px;
  margin: 0 auto;

  ${mediaQuery.medium} {
    padding: 0 20px;
  }

  ${mediaQuery.large} {
    padding: 0 20px;
  }
`;

export default DashboardLayout;

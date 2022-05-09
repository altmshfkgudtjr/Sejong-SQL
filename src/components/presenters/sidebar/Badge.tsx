import styled from 'styled-components';
// styles
import { typo } from 'sjds';

/**
 * 사이드바 뱃지
 */
const SidebarBadge = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 16px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.text.f4};
  ${typo.subtitle2};

  & > div {
    display: inline-block;
    margin-right: 4px;
  }
`;

export default SidebarBadge;

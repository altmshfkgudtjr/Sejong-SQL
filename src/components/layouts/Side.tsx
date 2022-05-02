import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
// store
import { uiState } from 'store/system/ui';
// styles
import { mediaQuery } from 'sjds';

/** 사이드 레이아웃 */
const SideLayout = ({ children }) => {
  const ui = useRecoilValue(uiState);

  return (
    <>
      <Wrapper isOpen={ui.side === 'Open'}>{children}</Wrapper>
    </>
  );
};

const Wrapper = styled.aside<{ isOpen: boolean }>`
  width: 100%;
  height: calc(100vh - 40px);
  overflow-y: auto;
  background-color: ${({ theme }) => theme.background.bg3};
  transform: ${({ isOpen }) => (isOpen ? 'translate3d(-320px, 0 0)' : 'translate3d(0, 0 0)')};
  transition: transform 0.4s ease-in-out;

  ${mediaQuery.large} {
    display: block;
    width: 320px;
    height: calc(100vh - 60px);
    padding: 24px 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default SideLayout;

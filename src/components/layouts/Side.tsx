import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
// store
import { uiState } from 'store/system/ui';
// styles
import { mediaQuery, zIndex } from 'sjds';

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
  position: fixed;
  top: 48px;
  left: 0;
  width: 100%;
  height: calc(100vh - 48px);
  padding: 24px 0;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.background.bg3};
  z-index: ${zIndex.sidebar};
  transform: ${({ isOpen }) => (isOpen ? 'translateX(-100%)' : 'translateX(0)')};
  transition: transform 0.2s ease-in-out;

  ${mediaQuery.large} {
    top: 60px;
    display: block;
    width: 320px;
    height: calc(100vh - 60px);
    transform: translateX(0);
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default SideLayout;

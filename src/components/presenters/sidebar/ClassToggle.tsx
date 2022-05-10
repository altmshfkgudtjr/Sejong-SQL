import styled, { useTheme } from 'styled-components';
import { useState } from 'react';
// components
import { Icon } from 'sjds/components/icons';
import { typo } from 'sjds';
// types
import { PropsWithChildren } from 'react';

/**
 * 사이드바 클래스 토글
 */
const SidebarClassToggle = ({ name, managerName, children }: PropsWithChildren<Props>) => {
  const [isOpen, setIsOpen] = useState(true);

  const currentTheme = useTheme();

  const onToggle = () => setIsOpen(v => !v);

  return (
    <Wrapper>
      <Button isOpen={isOpen} onClick={onToggle}>
        <Icon name="ic_arrow_down" width={16} height={16} stroke={currentTheme.text.f1} />
        <Name>{name}</Name>
        {managerName && <ManagerName>{managerName}</ManagerName>}
      </Button>

      <ContentWrapper isOpen={isOpen}>{children}</ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const ContentWrapper = styled.div<{ isOpen: boolean }>`
  height: auto;
  max-height: ${({ isOpen }) => (isOpen ? '1000px' : '0px')};
  transition: max-height 0.5s
    ${({ isOpen }) => (isOpen ? 'ease-in-out' : 'cubic-bezier(0, 1, 0, 1)')};
  overflow: hidden;
`;

const Button = styled.button<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  padding: 0 16px;
  margin-bottom: 8px;
  transition: 0.2s ease;

  svg {
    transform: ${({ isOpen }) => (isOpen ? `rotate(180deg)` : `rotate(0deg)`)};
    transition: 0.2s ease;
  }
`;

const Name = styled.span`
  ${typo.value1};
  color: ${({ theme }) => theme.text.f1};
  text-align: left;
`;

const ManagerName = styled.span`
  flex-shrink: 0;
  ${typo.value2};
  color: ${({ theme }) => theme.text.f4};
`;

type Props = {
  name: string;
  managerName?: string;
};

export default SidebarClassToggle;

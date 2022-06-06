import styled, { css, useTheme } from 'styled-components';
import { useState, useEffect } from 'react';
// components
import { Icon } from 'sjds/components/icons';
// styles
import { boxShadow, lib, typo } from 'sjds';
// types
import type { PropsWithChildren } from 'react';

/**
 * 주차 선택 드롭다운
 * @param props
 * @param props.value
 * @param props.placeholder
 */
const WeekDropdown = ({ value = '', placeholder, children }: PropsWithChildren<Props>) => {
  const currentTheme = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => setIsOpen(true);

  const onPreventClose = e => {
    if (isOpen) {
      e.stopPropagation();
    }
  };

  useEffect(() => {
    const callback = () => setIsOpen(false);

    if (isOpen) {
      document.addEventListener('mousedown', callback);
    }

    return () => document.removeEventListener('mousedown', callback);
  }, [isOpen]);

  return (
    <Wrapper>
      <SearchWrapper isOpen={isOpen} onClick={onClick} onMouseDown={onPreventClose}>
        <InputWrapper isOpen={isOpen}>
          <Input>
            {!value && <p>{placeholder}</p>}
            {value}
            <Icon name="ic_arrow_down" width={24} height={24} stroke={currentTheme.text.f4} />
          </Input>
        </InputWrapper>

        {isOpen && <>{children}</>}
      </SearchWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 48px;
  z-index: 1;
`;

const SearchWrapper = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 500px;
  overflow: auto;
  padding: ${({ isOpen }) => (isOpen ? '0 16px 16px' : '0 16px')};
  border-radius: 8px;
  background-color: ${({ isOpen, theme }) =>
    isOpen ? theme.background.bg2 : theme.background.bg3};
  ${({ isOpen }) => (isOpen ? boxShadow.e1 : '')};
  transition: 0.1s ease;

  ${({ theme, isOpen }) =>
    lib.onlyHover(css`
      background-color: ${isOpen ? '' : theme.background.bg4};
    `)};
`;

const InputWrapper = styled.div<{ isOpen: boolean }>`
  margin-bottom: ${({ isOpen }) => (isOpen ? '16px' : '0px')};
  border-bottom: 1px solid ${({ isOpen, theme }) => (isOpen ? theme.border.b2 : 'rgba(0,0,0,0)')};
  transition: 0.1s ease;
  cursor: ${({ isOpen }) => (isOpen ? 'default' : 'pointer')};

  svg {
    transform: ${({ isOpen }) => (isOpen ? `rotate(180deg)` : `rotate(0deg)`)};
    transition: 0.2s ease;
  }
`;

const Input = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 47px;
  padding: 12px 0;
  ${typo.value2};
  color: ${({ theme }) => theme.text.f2};
  background-color: rgba(0, 0, 0, 0);

  & > p {
    color: ${({ theme }) => theme.text.f4};
    pointer-events: none;
  }
`;

type Props = {
  value?: string;
  placeholder: string;
  onInput?: (e: any) => void;
};

export default WeekDropdown;

import styled from 'styled-components';
import { useState, useEffect } from 'react';
// styles
import { boxShadow, typo } from 'sjds';
// types
import type { PropsWithChildren } from 'react';

/**
 * 유저 검색 Input 및 모달
 * @param props
 * @param props.placeholder
 */
const SearchInput = ({ children, ...props }: PropsWithChildren<Props>) => {
  const [isOpen, setIsOpen] = useState(false);

  const onFocus = () => setIsOpen(true);

  const onPreventClick = e => e.stopPropagation();

  useEffect(() => {
    const callback = () => setIsOpen(false);

    if (isOpen) {
      document.addEventListener('click', callback);
    }

    return () => document.removeEventListener('click', callback);
  }, [isOpen]);

  return (
    <Wrapper>
      <SearchWrapper isOpen={isOpen} onFocus={onFocus} onClick={onPreventClick}>
        <InputWrapper isOpen={isOpen}>
          <Input type="text" {...props} />
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
`;

const InputWrapper = styled.div<{ isOpen: boolean }>`
  margin-bottom: ${({ isOpen }) => (isOpen ? '16px' : '0px')};
  border-bottom: 1px solid ${({ isOpen, theme }) => (isOpen ? theme.border.b2 : 'rgba(0,0,0,0)')};
  transition: 0.1s ease;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 16px 0;
  ${typo.value2};
  color: ${({ theme }) => theme.text.f2};
  background-color: rgba(0, 0, 0, 0);

  &::placeholder {
    color: ${({ theme }) => theme.text.f4};
  }
`;

type Props = {
  placeholder: string;
  onInput: (e: any) => void;
};

export default SearchInput;

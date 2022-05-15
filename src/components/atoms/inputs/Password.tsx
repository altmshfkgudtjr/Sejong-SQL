import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';

const PasswordInput = ({ autoFocus, onFocus, onBlur, ...props }, ref) => {
  const [isFocus, setIsFocus] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const _onFocus = e => {
    setIsFocus(true);
    onFocus && onFocus(e);
  };

  const _onBlur = e => {
    setIsFocus(false);
    onBlur && onBlur(e);
  };

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    autoFocus && wrapperRef.current.querySelector('input')?.focus();
  }, [autoFocus]);

  return (
    <Wrapper ref={wrapperRef} isFocus={isFocus}>
      <Input ref={ref} type="password" onFocus={_onFocus} onBlur={_onBlur} {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isFocus: boolean }>`
  width: 100%;
  max-width: 320px;
  height: 48px;
  padding: 16px;
  border-radius: ${({ isFocus }) => (isFocus ? '8px 8px 0 0' : '8px')};
  border-bottom: 2px solid ${({ isFocus, theme }) => (isFocus ? theme.primary : 'rgba(0,0,0,0)')};
  background-color: ${({ theme }) => theme.background.bg3};
`;

const Input = styled.input`
  display: block;
  width: 100%;
  color: ${({ theme }) => theme.text.f2};
  background-color: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.text.f4};
  }
`;

export default React.forwardRef(PasswordInput);

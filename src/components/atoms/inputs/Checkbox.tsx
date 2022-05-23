import styled, { css } from 'styled-components';
// styles
import { onlyHover } from 'sjds/lib';
// types
import type { InputHTMLAttributes } from 'react';

/**
 * 체크박스
 * @param props
 * @param props.label 라벨 (id)
 * @param props.message 체크박스 메세지
 * @param props.disabled 비활성화 여부
 *
 * @example
 * <CheckBox
 *   name="체크박스명"
 *   label="라벨명"
 *   message="로그인 상태 유지"
 * />
 */
const CheckBox = ({ label, message, disabled = false, ...props }: Props) => {
  return (
    <Label htmlFor={label} disabled={disabled}>
      {message}
      <input id={label} type="checkbox" disabled={disabled} {...props} />
      <span />
    </Label>
  );
};

const Label = styled.label<{ disabled: boolean }>`
  display: inline-block;
  position: relative;
  padding-left: 30px;
  padding-bottom: 22px;
  font-size: 14px;
  line-height: 20px;
  color: ${({ disabled, theme }) => (disabled ? theme.text.f2 : theme.text.f1)};
  user-select: none;
  cursor: pointer;

  ${({ disabled, theme }) =>
    onlyHover(css`
      input ~ span {
        background: ${disabled ? theme.background.bg1 : theme.background.bg2};
        border: 1px solid ${disabled ? theme.border.b1 : theme.semantic.success};
      }
    `)};

  input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
    cursor: pointer;

    &:checked ~ span {
      background: ${({ theme }) => theme.semantic.success};
      border: 1px solid ${({ theme }) => theme.semantic.success};
    }

    &:checked ~ span::after {
      opacity: 1;
    }

    &:disabled ~ span {
      border: 1px solid ${({ theme }) => theme.background.bg3};
    }
  }

  span {
    position: absolute;
    top: -1px;
    left: 0;
    height: 22px;
    width: 22px;
    background-color: ${({ theme }) => theme.background.bg1};
    border: 1px solid ${({ theme }) => theme.border.b2};
    border-radius: 2px;
    transition: background-color 0.1s ease, border 0.1s ease;

    &::after {
      content: '';
      position: absolute;
      left: 6px;
      top: 2px;
      width: 8px;
      height: 12px;
      border: 1px solid ${({ theme }) => theme.background.bg1};
      border-width: 0 2px 2px 0;
      opacity: 0;
      transform: rotate(45deg);
      transition: opacity 0.1s ease;
    }
  }
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  message?: string;
  checked?: boolean;
  disabled?: boolean;
}

export default CheckBox;

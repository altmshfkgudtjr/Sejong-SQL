import styled, { css } from 'styled-components';
// styles
import { onlyHover } from 'sjds/lib';
// types
import type { InputHTMLAttributes } from 'react';

/**
 * 라디오 버튼
 * @param props
 * @param props.name 라디오버튼 그룹명
 * @param props.label 라벨 (id)
 * @param props.message 라디오버튼 메세지
 * @param props.disabled 비활성화 여부
 *
 * @example
 * <div>
 * 	<RadioButton name="Group" label="1번" message="1번 메세지" />
 * 	<RadioButton name="Group" label="2번" message="2번 메세지" />
 * 	<RadioButton name="Group" label="3번" message="3번 메세지" />
 * 	<RadioButton name="Group" label="4번" message="4번 메세지" />
 * </div>
 */
const RadioButton = ({ name, label = '', message, disabled = false, ...props }: Props) => {
  return (
    <Label htmlFor={label} disabled={disabled}>
      {message}
      <input type="radio" name={name} id={label} value={label} disabled={disabled} {...props} />
      <span />
    </Label>
  );
};

const Label = styled.label<{ disabled: boolean }>`
  display: block;
  position: relative;
  height: 24px;
  padding-left: 30px;
  font-size: 14px;
  line-height: 20px;
  color: ${({ disabled, theme }) => (disabled ? theme.text.f2 : theme.text.f1)};
  user-select: none;
  cursor: pointer;

  ${({ disabled, theme }) =>
    onlyHover(css`
      input ~ span {
        background: ${theme.background.bg2};
      }

      @media (hover: hover) {
        input ~ span {
          background: ${disabled ? theme.background.bg1 : theme.semantic.success};
          border: 1px solid ${disabled ? theme.background.bg1 : theme.semantic.success};
        }
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

    &:checked:disabled ~ span {
      background: ${({ theme }) => theme.background.bg4};
      border: 1px solid ${({ theme }) => theme.background.bg4};
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
    top: 1px;
    left: 2px;
    height: 20px;
    width: 20px;
    background-color: ${({ theme }) => theme.background.bg1};
    border: 1px solid ${({ theme }) => theme.background.bg3};
    border-radius: 20px;
    transition: background-color 0.1s ease, border 0.1s ease;

    &::after {
      content: '';
      position: absolute;
      left: 6px;
      top: 3px;
      width: 6px;
      height: 10px;
      border: 1px solid ${({ theme }) => theme.background.bg1};
      border-width: 0 2px 2px 0;
      opacity: 0;
      transform: rotate(45deg);
      transition: opacity 0.1s ease;
    }
  }
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  message?: string;
  disabled?: boolean;
}

export default RadioButton;

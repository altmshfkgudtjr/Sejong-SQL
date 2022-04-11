import styled from 'styled-components';
// styles
import { onlyHover } from 'sjds/lib';

/**
 * 라디오 버튼
 * @param props
 * @param props.name 라디오버튼 그룹명
 * @param props.label 라벨 (id)
 * @param props.message 라디오버튼 메세지
 * @param props.checked 체크 여부
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
const RadioButton = ({ name, label, message, checked, disabled }: Props) => {
  return (
    <Label htmlFor={label} disabled={disabled}>
      {message}
      <input
        type="radio"
        name={name}
        id={label}
        value={label}
        checked={checked}
        disabled={disabled}
      />
      <span />
    </Label>
  );
};

const Label = styled.label<{ disabled: boolean }>`
  display: block;
  position: relative;
  height: 24px;
  padding-left: 28px;
  font-size: 14px;
  line-height: 20px;
  color: ${props => (props.disabled ? palette.font.tertiary2 : palette.font.tertiary1)};
  user-select: none;
  cursor: pointer;

  ${onlyHover(css`
    input ~ span {
      background: ${palette.grey010};
    }

    @media (hover: hover) {
      background: ${props => (props.disabled ? palette.white : palette.red040)};
      border: 1px solid ${props => (props.disabled ? palette.grey030 : palette.red040)};
    }
  `)}

  input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
    cursor: pointer;

    &:checked ~ span {
      background: ${palette.red040};
      border: 1px solid ${palette.red040};
    }

    &:checked:disabled ~ span {
      background: ${palette.grey010};
      border: 1px solid ${palette.grey010};
    }

    &:checked ~ span::after {
      opacity: 1;
    }

    &:disabled ~ span {
      border: 1px solid ${palette.grey030};
    }
  }

  span {
    position: absolute;
    top: 1px;
    left: 2px;
    height: 20px;
    width: 20px;
    background: ${palette.white};
    border: 1px solid ${palette.grey040};
    border-radius: 20px;
    transition: background 0.1s ease, border 0.1s ease;

    &::after {
      content: '';
      position: absolute;
      left: 6px;
      top: 3px;
      width: 6px;
      height: 10px;
      border: 1px solid ${palette.white};
      border-width: 0 2px 2px 0;
      opacity: 0;
      transform: rotate(45deg);
      transition: opacity 0.1s ease;
    }
  }
`;

interface Props {
  name: string;
  label: string;
  message: string;
  checked: boolean;
  disabled: boolean;
}

export default RadioButton;

import styled from 'styled-components';

/**
 * 토글
 * @param props
 * @param props.checked 토글 여부
 * @param props.disabled 비활성화 여부
 *
 * @example
 * <Toggle checked={true} onClick={() => {}} />
 */
const Toggle = ({ checked, disabled, onClick, ...props }: Props) => {
  return (
    <Wrapper checked={checked} disabled={disabled} onClick={onClick} {...props}>
      <Controller checked={checked} />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ checked?: boolean; disabled?: boolean }>`
  position: relative;
  width: 52px;
  height: 32px;
  border-radius: 32px;
  background-color: ${({ checked, disabled, theme }) => {
    if (disabled) {
      return theme.background.bg5;
    }
    if (checked) {
      return theme.semantic.success;
    }
    if (!checked) {
      return theme.background.bg3;
    }
  }};
  cursor: pointer;
  transition: 0.1s ease;
`;

const Controller = styled.div<{ checked?: boolean }>`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.background.bg2};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.24);
  transition: 0.1s ease;
  transform: ${({ checked }) => (checked ? `translateX(20px)` : `translateX(0)`)};
`;

interface Props {
  checked?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export default Toggle;

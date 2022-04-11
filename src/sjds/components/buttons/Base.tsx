import styled from 'styled-components';

/** Base 버튼 */
const BaseButton = styled.button<BaseButtonType>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex: 1 0 auto;
  height: ${({ size }) => {
    if (size === 'ExtraSmall') {
      return '36px';
    } else if (size === 'Small') {
      return '40px';
    } else if (size === 'Regular') {
      return '44px';
    } else if (size === 'Large') {
      return '50px';
    } else if (size === 'ExtraLarge') {
      return '54px';
    } else {
      return size;
    }
  }};
  padding: 14px 16px;
  margin: 0;
  border-radius: 16px;
  font-size: ${({ size }) => {
    if (size === 'ExtraSmall') {
      return '14px';
    } else if (size === 'Small') {
      return '14px';
    } else if (size === 'Regular') {
      return '14px';
    } else if (size === 'Large') {
      return '16px';
    } else if (size === 'ExtraLarge') {
      return '16px';
    }
  }};
  font-weight: 400;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export interface BaseButtonType {
  size?: 'ExtraSmall' | 'Small' | 'Regular' | 'Large' | 'ExtraLarge';
  color?: string;
  disabled?: boolean;
}

export default BaseButton;

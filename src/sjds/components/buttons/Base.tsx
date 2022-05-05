import styled from 'styled-components';

/** Base 버튼 */
const BaseButton = styled.button<BaseButtonType>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex: 1 0 auto;
  height: ${({ size = 'Regular' }) => {
    const _ = {
      ExtraSmall: '36px',
      Small: '40px',
      Regular: '44px',
      Large: '50px',
      ExtraLarge: '54px',
    };

    return _[size];
  }};
  padding: ${({ size = 'Regular' }) => {
    const _ = {
      ExtraSmall: '10px 12px',
      Small: '12px 14px',
      Regular: '14px 16px',
      Large: '16px 18px',
      ExtraLarge: '18px 20px',
    };

    return _[size];
  }};
  margin: 0;
  border-radius: ${({ size = 'Regular' }) => {
    const _ = {
      ExtraSmall: '10px',
      Small: '12px',
      Regular: '16px',
      Large: '18px',
      ExtraLarge: '20px',
    };

    return _[size];
  }};
  font-size: ${({ size = 'Regular' }) => {
    const _ = {
      ExtraSmall: '14px',
      Small: '14px',
      Regular: '14px',
      Large: '16px',
      ExtraLarge: '16px',
    };

    return _[size];
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

type ButtonSize = 'ExtraSmall' | 'Small' | 'Regular' | 'Large' | 'ExtraLarge';

export interface BaseButtonType {
  size?: ButtonSize;
  color?: string;
  disabled?: boolean;
}

export default BaseButton;

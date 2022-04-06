import styled from 'styled-components';
// components
import BaseButton from './Base';
// types
import type { BaseButtonType } from './Base';

/**
 * 배경색이 있는 버튼
 */
const FillButton = styled(BaseButton)<FillButtonType>`
  position: relative;
  background-color: ${({ color, disabled }) => {
    if (disabled) {
      return '#dddddd';
    }

    return color;
  }};
  transition: 0.1s ease;
`;

interface FillButtonType extends BaseButtonType {
  color?: string;
}

export default FillButton;

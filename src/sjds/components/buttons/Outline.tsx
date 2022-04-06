import styled, { css } from 'styled-components';
// components
import BaseButton from './Base';
// lib
import { onlyHover } from '../../lib';

/**
 * 테두리가 있는 버튼
 */
const OutlineButton = styled(BaseButton)`
  border: 1px solid
    ${({ color, disabled }) => {
      if (disabled) {
        return '#aaaaaa';
      }

      return color;
    }};

  color: ${({ color, disabled }) => {
    if (disabled) {
      return '#aaaaaa';
    }

    return color;
  }};

  ${onlyHover(css``)}
`;

export default OutlineButton;

import styled, { css } from 'styled-components';
// components
import BaseButton from './Base';
// lib
import { onlyHover } from '../../lib';

/**
 * 텍스트 버튼
 */
const TextButton = styled(BaseButton)`
  color: ${({ color, disabled }) => {
    if (disabled) {
      return '#aaaaaa';
    }

    return color;
  }};

  ${onlyHover(css``)}
`;

export default TextButton;

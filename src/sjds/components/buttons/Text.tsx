import styled, { css } from 'styled-components';
// components
import BaseButton from './Base';
// styles
import { onlyHover } from 'sjds/lib';

const TextButton = styled(BaseButton)`
  color: ${({ color, disabled, theme }) => {
    if (disabled) {
      return theme.text.f4;
    }

    if (color) {
      return color;
    }

    return theme.text.f1;
  }};
  z-index: 0;

  &::before {
    background-color: rgba(0, 0, 0, 0);
    opacity: 0;
    z-index: -1;
  }

  ${({ disabled, theme }) =>
    !disabled &&
    css`
      ${onlyHover(css`
        &::before {
          background-color: ${theme.background.bg5};
          opacity: 0.2;
        }
      `)}
    `};
`;

export default TextButton;

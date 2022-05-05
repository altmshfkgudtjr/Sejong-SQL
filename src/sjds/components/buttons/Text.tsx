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

    return color;
  }};

  &::before {
    background-color: rgba(0, 0, 0, 0);
  }

  ${({ disabled }) =>
    !disabled &&
    css`
      ${onlyHover(css`
        &::before {
          background-color: rgba(0, 0, 0, 0.04);
        }
      `)}
    `};
`;

export default TextButton;

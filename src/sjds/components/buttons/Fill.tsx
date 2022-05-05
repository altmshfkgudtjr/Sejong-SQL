import styled, { css } from 'styled-components';
// components
import BaseButton from './Base';
// styles
// import { palette } from '../styles';
import { onlyHover } from 'sjds/lib';

const FillButton = styled(BaseButton)`
  background-color: ${({ color, disabled, theme }) => {
    if (disabled) {
      return theme.background.bg4;
    }

    return color;
  }};

  color: ${({ color, disabled, theme }) => {
    if (color && !disabled) {
      return theme.semantic.white;
    } else if (disabled) {
      return theme.text.f4;
    } else {
      return color;
    }
  }};

  &::before {
    background-color: rgba(0, 0, 0, 0);
  }

  ${({ disabled }) =>
    !disabled &&
    css`
      ${onlyHover(css`
        &::before {
          background-color: rgba(255, 255, 255, 0.2);
        }
      `)}
    `};
`;

export default FillButton;

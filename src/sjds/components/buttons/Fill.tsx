import styled, { css } from 'styled-components';
// components
import BaseButton from './Base';
// styles
// import { palette } from '../styles';
import { onlyHover } from 'sjds/lib';

const FillButton = styled(BaseButton)`
  background-color: ${({ color, disabled }) => {
    if (disabled) {
      return '#ccc';
      // return palette.grey010;
    }

    return color;
  }};

  color: ${({ color, disabled }) => {
    if (color && !disabled) {
      return '#fff';
      // return palette.white;
    } else if (disabled) {
      return '#aaa';
      // return palette.grey040;
    } else {
      return '#484848';
      // return palette.font.primary;
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

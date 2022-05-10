import { css, CSSProp } from 'styled-components';

/**
 * Enable only hover
 * - Desktop: hover
 * - Mobile: active
 * @example
 *
 * ${onlyHover(css`
 *   ...
 * `)}
 *
 * ${({ theme }) => lib.onlyHover(css`
 *   ...
 * `)}
 */
export const onlyHover = (cssProps?: CSSProp) => {
  return css`
    @media (hover: hover) and (pointer: fine),
      only screen and (-ms-high-contrast: active),
      (-ms-high-contrast: none) {
      &:hover {
        ${cssProps}
      }
    }

    &:active {
      ${cssProps}
    }
  `;
};

/**
 * Text Line Clamp
 * @param line 줄임말 적용할 라인 수
 *
 * @example
 * ${textLineClamp(2)}
 */
export const textLineClamp = (line: number) => {
  return css`
    display: -webkit-box;
    white-space: break-spaces;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${line};
    overflow: hidden;
  `;
};

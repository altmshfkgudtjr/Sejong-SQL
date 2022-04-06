import { css } from 'styled-components';
// styles
import { mediaQuery } from './media';

/** 화면 크기별 Margin 값 */
export const marginValue = {
  small: 8,
  medium: 16,
  large: 24,
};

/** Margin 수직 */
export const vertical = css`
  margin-top: ${marginValue.small}px;
  margin-bottom: ${marginValue.small}px;

  ${mediaQuery.medium} {
    margin-top: ${marginValue.medium}px;
    margin-bottom: ${marginValue.medium}px;
  }

  ${mediaQuery.large} {
    margin-top: ${marginValue.large}px;
    margin-bottom: ${marginValue.large}px;
  }
`;

/** Margin 수평 */
export const horizontal = css`
  margin-left: ${marginValue.small}px;
  margin-right: ${marginValue.small}px;

  ${mediaQuery.medium} {
    margin-left: ${marginValue.medium}px;
    margin-right: ${marginValue.medium}px;
  }

  ${mediaQuery.large} {
    margin-left: ${marginValue.large}px;
    margin-right: ${marginValue.large}px;
  }
`;

/** Margin 상단 */
export const top = css`
  margin-top: ${marginValue.small}px;

  ${mediaQuery.medium} {
    margin-top: ${marginValue.medium}px;
  }

  ${mediaQuery.large} {
    margin-top: ${marginValue.large}px;
  }
`;

/** Margin 하단 */
export const bottom = css`
  margin-bottom: ${marginValue.small}px;

  ${mediaQuery.medium} {
    margin-bottom: ${marginValue.medium}px;
  }

  ${mediaQuery.large} {
    margin-bottom: ${marginValue.large}px;
  }
`;

/** Margin 좌측 */
export const left = css`
  margin-left: ${marginValue.small}px;

  ${mediaQuery.medium} {
    margin-left: ${marginValue.medium}px;
  }

  ${mediaQuery.large} {
    margin-left: ${marginValue.large}px;
  }
`;

/** Margin 우측 */
export const right = css`
  margin-right: ${marginValue.small}px;

  ${mediaQuery.medium} {
    margin-right: ${marginValue.medium}px;
  }

  ${mediaQuery.large} {
    margin-right: ${marginValue.large}px;
  }
`;

import { css } from 'styled-components';
// styles
import { mediaQuery } from './media';
import { marginValue } from './margin';

/**
 * 그리드시스템 Column
 * @param col Column 개수 (기준: width)
 *
 * @example
 * import styled from 'styled-components';
 * import { column } from 'ruix';
 *
 * const App = () => {
 *   return (
 *     <div>
 *       <Section />
 *       <MainSection />
 *       <Section />
 *     </div>
 *   );
 * }
 *
 * const Section = styled.div`
 *   flex: 1 1 0;
 *   height: 40px;
 * `;
 *
 * const MainSection = styled(Section)`
 *   ${column(8)}
 * `;
 */
export const column = (col: number) => css`
  flex: 0 0 auto;
  max-width: 100%;

  ${() => {
    const size = (2 / 12) * Math.floor(col / 2) * 100;
    return css`
      width: ${size}%;
      padding-left: ${marginValue.small / 2}px;
      padding-right: ${marginValue.small / 2}px;
    `;
  }}

  ${mediaQuery.medium} {
    ${() => {
      const size = (2 / 12) * Math.floor(col / 2) * 100;
      return css`
        width: ${size}%;
        padding-left: ${marginValue.medium / 2}px;
        padding-right: ${marginValue.medium / 2}px;
      `;
    }}
  }

  ${mediaQuery.large} {
    ${() => {
      const size = (1 / 12) * col * 100;
      return css`
        width: ${size}%;
        padding-left: ${marginValue.large / 2}px;
        padding-right: ${marginValue.large / 2}px;
      `;
    }}
  }

  &:first-of-type {
    padding-left: 0;
  }

  &:last-of-type {
    padding-right: 0;
  }
`;

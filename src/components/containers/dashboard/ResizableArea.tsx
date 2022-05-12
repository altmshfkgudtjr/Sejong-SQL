import styled, { css } from 'styled-components';
import Split from 'react-split';
// types
import type { ReactNode } from 'react';
import { boxShadow, lib } from 'sjds';

/**
 * 대시보드 조절이 가능한 3등분 영역
 * - 문제풀이 View
 */
const ResizableArea = ({ left, top, bottom }: Props) => {
  return (
    <SplitLayout
      direction="horizontal"
      sizes={[40, 60]}
      minSize={300}
      gutterSize={12}
      style={{ height: '100%' }}
    >
      <Area>{left}</Area>
      <SplitLayout
        direction="vertical"
        sizes={[55, 45]}
        minSize={100}
        gutterSize={12}
        style={{ width: '100%' }}
      >
        <Area isDeep>{top}</Area>
        <Area isDeep>{bottom}</Area>
      </SplitLayout>
    </SplitLayout>
  );
};

const SplitLayout = styled(Split)<{ direction: 'horizontal' | 'vertical' }>`
  display: flex;
  flex-direction: ${({ direction }) => (direction === 'vertical' ? 'column' : 'row')};
  position: relative;

  .gutter {
    flex-shrink: 0;
    background-color: ${({ theme }) => theme.background.bg4};
    transition: background-color 0.2s ease;

    ${lib.onlyHover(css`
      background-color: ${({ theme }) => theme.background.bg5};
    `)};
  }

  .gutter-horizontal {
    width: 12px;
    height: 100%;
    cursor: col-resize;
  }

  .gutter-vertical {
    width: 100%;
    height: 12px;
    cursor: row-resize;
  }
`;

const Area = styled.div<{ isDeep?: boolean }>`
  padding: 20px 20px 0 20px;
  background-color: ${({ isDeep, theme }) =>
    isDeep ? theme.background.bg3 : theme.background.bg2};
  box-sizing: border-box;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
    background-color: ${({ theme }) => theme.background.bg4};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background-color: ${({ theme }) => theme.background.bg5};
    opacity: 0.8;
    ${boxShadow.e1};

    ${lib.onlyHover(css`
      opacity: 1;
    `)}
  }
`;

type Props = {
  left: ReactNode;
  top: ReactNode;
  bottom: ReactNode;
};

export default ResizableArea;

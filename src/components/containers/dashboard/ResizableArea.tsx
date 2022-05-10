import styled, { css } from 'styled-components';
// types
import type { ReactNode } from 'react';
import { lib } from 'sjds';

/**
 * 대시보드 조절이 가능한 3등분 영역
 * - 문제풀이 View
 */
const ResizableArea = ({ left, top, bottom }: Props) => {
  return (
    <Wrapper>
      <LeftWrapper>{left}</LeftWrapper>

      <VerticalHandle />

      <RightWrapper>
        <TopWrapper>{top}</TopWrapper>

        <HorizontalHandle />

        <BottomWrapper>{bottom}</BottomWrapper>
      </RightWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const LeftWrapper = styled.div`
  flex: 1;
  height: 100%;
  padding: 20px;
`;

const RightWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.background.bg3};
`;

const TopWrapper = styled.div`
  flex: 1;
  padding: 20px 0;
`;

const BottomWrapper = styled.div`
  flex: 1;
  padding: 20px 0;
`;

const VerticalHandle = styled.div`
  flex-shrink: 0;
  width: 16px;
  height: 100%;
  background-color: ${({ theme }) => theme.background.bg4};
  cursor: col-resize;
  transition: background-color 0.2s ease;

  ${lib.onlyHover(css`
    background-color: ${({ theme }) => theme.background.bg5};
  `)};
`;

const HorizontalHandle = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 16px;
  background-color: ${({ theme }) => theme.background.bg4};
  cursor: row-resize;
  transition: background-color 0.2s ease;

  ${lib.onlyHover(css`
    background-color: ${({ theme }) => theme.background.bg5};
  `)};
`;

type Props = {
  left: ReactNode;
  top: ReactNode;
  bottom: ReactNode;
};

export default ResizableArea;

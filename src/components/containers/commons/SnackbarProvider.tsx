import styled, { css } from 'styled-components';
import { useCallback } from 'react';
// components
import Snackbar from 'components/presenters/commons/Snackbar';
// hooks
import useSnackbar from 'hooks/dom/useSnackbar';
// styles
import { zIndex, mediaQuery } from 'sjds';

/**
 * 스낵바 컨트롤러
 * @param options 스낵바 초기 옵션
 */
const SnackbarProvider = ({
  position = 'BottomRight',
  duration = 3000,
  animationDuration = 250,
  closeEnabled = true,
  stackEnabled = true,
  maxCount = 3,
}: SnackbarOption) => {
  const { snackbarList, removeSnackbar } = useSnackbar();
  const isExist = snackbarList.length > 0;

  const onRemove = useCallback(
    (snackbarId: string) => {
      if (!closeEnabled) {
        return;
      }
      removeSnackbar(snackbarId);
    },
    [closeEnabled, removeSnackbar],
  );

  const SnackbarList = snackbarList.map((snackbar, idx) => {
    return (
      <Snackbar
        key={snackbar.id}
        idx={snackbarList.length - 1 - idx}
        snackbar={snackbar}
        position={position}
        duration={duration}
        animationDuration={animationDuration}
        closeEnabled={closeEnabled}
        stackEnabled={stackEnabled}
        maxCount={maxCount}
        onRemove={onRemove}
      />
    );
  });

  return <>{isExist && <SnackbarWrapper position={position}>{SnackbarList}</SnackbarWrapper>}</>;
};

const SnackbarWrapper = styled.div<{ position: SnackbarPosition }>`
  position: fixed;
  width: 100%;
  ${({ position }) => {
    const _ = {
      TopLeft: css`
        top: 8px;
        left: 8px;
        right: 8px;
      `,
      TopCenter: css`
        top: 8px;
        left: 8px;
        right: 8px;
      `,
      TopRight: css`
        top: 8px;
        left: 8px;
        right: 8px;
      `,
      BottomLeft: css`
        bottom: 8px;
        left: 8px;
        right: 8px;
      `,
      BottomCenter: css`
        bottom: 8px;
        left: 8px;
        right: 8px;
      `,
      BottomRight: css`
        bottom: 8px;
        left: 8px;
        right: 8px;
      `,
    };
    return _[position];
  }};
  margin: auto;
  z-index: ${zIndex.snackbar};

  ${mediaQuery.medium} {
    width: 320px;
    ${({ position }) => {
      const _ = {
        TopLeft: css`
          top: 80px;
          left: 20px;
          right: initial;
        `,
        TopCenter: css`
          top: 80px;
          left: 20px;
          right: 20px;
        `,
        TopRight: css`
          top: 80px;
          left: initial;
          right: 20px;
        `,
        BottomLeft: css`
          bottom: 20px;
          left: 20px;
          right: initial;
        `,
        BottomCenter: css`
          bottom: 20px;
          left: 20px;
          right: 20px;
        `,
        BottomRight: css`
          bottom: 20px;
          left: initial;
          right: 20px;
        `,
      };
      return _[position];
    }};
  }
`;

export type SnackbarPosition =
  | 'TopLeft'
  | 'TopCenter'
  | 'TopRight'
  | 'BottomLeft'
  | 'BottomCenter'
  | 'BottomRight';

/** 스낵바 옵션 */
interface SnackbarOption {
  /** 위치 */
  position?: SnackbarPosition;
  /** 지속 시간 */
  duration?: number;
  /** 애니메이션 진행 시간 */
  animationDuration?: number;
  /** 닫기 가능 여부 */
  closeEnabled?: boolean;
  /** 스택처럼 쌓임 여부 */
  stackEnabled?: boolean;
  /** 스낵바 최대 개수 */
  maxCount?: number;
}

export default SnackbarProvider;

import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
// styles
import { animations, boxShadow, typo } from 'sjds';
// types
import { Snackbar as SnackbarInfo, SnackbarType } from 'store/system/snackbar';
import { SnackbarPosition } from 'components/containers/commons/SnackbarProvider';

/**
 * 스낵바
 * @param props
 * @param props.idx 스낵바 순서
 * @param props.snackbar 스낵바 정보
 * @param props.position 위치
 * @param props.duration 지속 시간
 * @param props.animationDuration 애니메이션 진행 시간
 * @param props.closeEnabled 닫기 여부
 * @param props.stackEnabled 스택 여부
 * @param props.maxCount 최대 개수
 * @param props.onRemove 스낵바 닫기 함수
 */
const Snackbar = ({
  idx,
  snackbar,
  position,
  duration,
  animationDuration,
  closeEnabled,
  stackEnabled,
  maxCount,
  onRemove,
}: Props) => {
  const [isClose, setIsClose] = useState(false);

  const onClose = () => closeEnabled && setIsClose(true);

  /** 최대 개수에 따른 오래된 스낵바 제거 */
  useEffect(() => {
    if (idx === maxCount) {
      setIsClose(true);
    }

    if (!stackEnabled && idx === 1) {
      setIsClose(true);
    }
  }, [idx, maxCount, stackEnabled]);

  /** Timer 시작 */
  useEffect(() => {
    if (isClose) {
      return;
    }

    const _ = window.setTimeout(() => setIsClose(true), duration);
    return () => window.clearTimeout(_);
  }, [isClose, duration]);

  /** 닫는 애니메이션 시작 */
  useEffect(() => {
    if (!isClose) {
      return;
    }

    const _ = window.setTimeout(() => onRemove(snackbar.id), animationDuration);
    return () => window.clearTimeout(_);
  }, [isClose, snackbar, animationDuration, onRemove]);

  return (
    <Wrapper
      isClose={isClose}
      isTop={position.startsWith('Top')}
      idx={idx}
      snackbarType={snackbar.type}
      animationDuration={animationDuration}
      closeEnabled={closeEnabled}
      stackEnabled={stackEnabled}
      onClick={onClose}
    >
      {!!snackbar.title && <Title>{snackbar.title}</Title>}
      <Message>{snackbar.message}</Message>
    </Wrapper>
  );
};

const Wrapper = styled.div<WrapperType>`
  position: absolute;
  ${({ isTop }) =>
    isTop
      ? css`
          top: 0;
        `
      : css`
          bottom: 0;
        `};
  right: 0;
  width: 100%;
  height: auto;
  padding: 16px;
  border-radius: 8px;
  color: ${({ snackbarType, theme }) => {
    const _ = {
      Info: theme.semantic.info,
      Success: theme.semantic.success,
      Warning: theme.semantic.warning,
      Danger: theme.semantic.danger,
    };
    return _[snackbarType];
  }};
  background-color: ${({ snackbarType }) => {
    const _ = {
      Info: '#ECF4FD',
      Success: '#ECF8F4',
      Warning: '#FBF4EC',
      Danger: '#FBF0F1',
    };
    return _[snackbarType];
  }};
  ${boxShadow.e1};
  cursor: ${({ closeEnabled }) => (closeEnabled ? 'pointer' : 'initial')};
  ${({ isClose, animationDuration }) =>
    isClose
      ? css`
          animation: ${animationDuration}ms ${animations.fadeOut} ease;
        `
      : css`
          animation: ${animationDuration}ms ${animations.fadeIn} ease;
        `};
  transform: ${({ idx, stackEnabled, isTop }) => {
    if (!stackEnabled) {
      return '';
    }

    return `translate(0, calc((100% + 8px) * ${idx} * ${isTop ? 1 : -1}))`;
  }};
  transition: transform 0.2s ease;
`;

const Title = styled.p`
  margin-bottom: 8px;
  ${typo.subtitle1};
  color: inherit;
`;

const Message = styled.p`
  ${typo.subvalue2};
  color: inherit;
`;

type WrapperType = {
  isClose: boolean;
  isTop: boolean;
  idx: number;
  snackbarType: SnackbarType;
  animationDuration: number;
  closeEnabled: boolean;
  stackEnabled: boolean;
};

type Props = {
  idx: number;
  snackbar: SnackbarInfo;
  position: SnackbarPosition;
  duration: number;
  animationDuration: number;
  closeEnabled: boolean;
  stackEnabled: boolean;
  maxCount: number;
  onRemove: (snackbarId: string) => void;
};

export default Snackbar;

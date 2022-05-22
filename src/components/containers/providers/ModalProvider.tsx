import styled, { css } from 'styled-components';
import { Suspense, useState, useEffect } from 'react';
// components
import * as modals from 'components/containers/modals';
// hooks
import useModal from 'hooks/dom/useModal';
// styles
import { zIndex, animations } from 'sjds';

/**
 * 모달 컨트롤러
 */
const ModalProvider = () => {
  const [closingIdx, setClosingIdx] = useState<null | number>(null);

  const { modalList, popModal, removeModal } = useModal();
  const isExist = modalList.length > 0;

  /** Prevent MouseDown Close */
  const onPreventModalOff = e => e.stopPropagation();

  /** Modal Close */
  const onClose = name => {
    const idx = modalList.findIndex(modal => modal.name === name);
    setClosingIdx(idx);

    window.setTimeout(() => {
      setClosingIdx(null);
      removeModal(name);
    }, 200);
  };

  /** All Modal Close */
  const onCloseAll = () => {
    setClosingIdx(modalList.length - 1);

    window.setTimeout(() => {
      popModal();
      setClosingIdx(null);
    }, 200);
  };

  useEffect(() => {
    if (isExist) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.removeAttribute('style');
    }

    return () => {
      document.body.removeAttribute('style');
    };
  }, [isExist]);

  const ModalList = modalList.map((modal, idx) => {
    const Content = modals[modal.name];
    return (
      <ModalWrapper key={modal.name} isClose={closingIdx === idx} onClick={onPreventModalOff}>
        <Suspense fallback={null}>
          <Content onCloseModal={() => onClose(modal.name)} args={modal.args} />
        </Suspense>
      </ModalWrapper>
    );
  });

  return <>{isExist && <Background onClick={onCloseAll}>{ModalList}</Background>}</>;
};

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: ${zIndex.modal};
  background-color: rgba(0, 0, 0, 0.65);
  animation: 0.1s ${animations.fadeIn} ease;
`;

const ModalWrapper = styled.div<{ isClose: boolean }>`
  position: absolute;
  width: fit-content;
  height: fit-content;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  ${({ isClose }) =>
    isClose
      ? css`
          animation: 0.25s ${animations.modalOff} ease;
        `
      : css`
          animation: 0.25s ${animations.modalOn} ease;
        `};
`;

export default ModalProvider;

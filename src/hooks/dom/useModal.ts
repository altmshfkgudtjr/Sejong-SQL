import { useRecoilState } from 'recoil';
import { modalState } from 'store/system/modal';
// types
import type { Modal } from 'store/system/modal';

/**
 * 모달 시스템
 */
const useModal = () => {
  const [modalList, setModalList] = useRecoilState(modalState);

  /** 모달 추가 */
  const pushModal = (modal: Modal) => {
    const newModalList = [...modalList, modal];
    setModalList(newModalList);
  };

  /** 마지막 모달 제거 */
  const popModal = () => {
    const newModalList = [...modalList];
    newModalList.pop();
    setModalList(newModalList);
  };

  /** 특정 모달 제거 */
  const removeModal = (name: string) => {
    const newModalList = [...modalList].filter(modal => modal.name !== name);
    setModalList(newModalList);
  };

  return {
    modalList,
    pushModal,
    popModal,
    removeModal,
  };
};

export default useModal;

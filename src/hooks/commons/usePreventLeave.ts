import { useEffect } from 'react';

/**
 * 이탈 방지 옵션 Hook
 * @param {object} props
 * @param {boolean} props.status 이탈 방지 여부
 */
const usePreventLeavePage = (status = false) => {
  useEffect(() => {
    if (status) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [status]);

  return status;
};

export default usePreventLeavePage;

import { useRecoilState } from 'recoil';
import { snackbarState } from 'store/system/snackbar';
import { useCallback } from 'react';
// utils
import { initRandomChar } from 'utils/random';
// types
import type { Snackbar } from 'store/system/snackbar';

/**
 * 스낵바 시스템
 */
const useSnackbar = () => {
  const [snackbarList, setSnackbarList] = useRecoilState(snackbarState);

  /** 스낵바 생성 */
  const initSnackbar = useCallback(
    (data: Omit<Snackbar, 'id'>) => {
      const snackbarId = `snackbar-${initRandomChar(4)}`;
      const snackbar = {
        id: snackbarId,
        ...data,
      };
      const newSnackbarList = (_: Snackbar[]) => [..._, snackbar];
      setSnackbarList(newSnackbarList);
    },
    [setSnackbarList],
  );

  /** 스낵바 제거 */
  const removeSnackbar = useCallback(
    (snackbarId: string) => {
      const newSnackbarList = (_: Snackbar[]) => {
        return [..._].filter(snackbar => snackbar.id !== snackbarId);
      };
      setSnackbarList(newSnackbarList);
    },
    [setSnackbarList],
  );

  return {
    snackbarList,
    initSnackbar,
    removeSnackbar,
  };
};

export default useSnackbar;

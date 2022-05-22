import { atom } from 'recoil';

export const snackbarState = atom<State>({
  key: 'snackbarState',
  default: [],
  dangerouslyAllowMutability: true,
});

export type Snackbar = {
  id: string;
  /** 스낵바 타입 */
  type: SnackbarType;
  /** 스낵바 제목 */
  title: string;
  /** 스낵바 내용 */
  message: string;
};

export type SnackbarType = 'Info' | 'Success' | 'Warning' | 'Danger';

export type State = Snackbar[];

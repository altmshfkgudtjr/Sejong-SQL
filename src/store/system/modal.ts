import { atom } from 'recoil';

export const modalState = atom<State>({
  key: 'modalState',
  default: [],
  dangerouslyAllowMutability: true,
});

export type Modal = {
  /** 모달 컴포넌트명 - 고유값 */
  name: string;
  /** 모달 Arguments */
  args?: object;
};

export type State = Modal[];

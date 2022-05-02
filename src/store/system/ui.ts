import { atom } from 'recoil';

export const uiState = atom<State>({
  key: 'uiState',
  default: {
    side: 'Open',
  },
});

export type SideState = 'Open' | 'Close';

export type State = {
  side: SideState;
};

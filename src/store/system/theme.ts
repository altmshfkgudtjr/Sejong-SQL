import { atom } from 'recoil';

export const themeState = atom<State>({
  key: 'themeState',
  default: {
    mode: 'Default',
    system: 'Pending',
  },
});

export type Mode = 'Default' | 'Light' | 'Dark';

export type System = 'Pending' | 'Light' | 'Dark';

export type State = {
  mode: Mode;
  system: System;
};

import { selector } from 'recoil';
import { themeState } from './theme';
// types
import { State, Mode, System } from './theme';

/** 현재 테마 설정 */
export const setTheme = selector<State | Mode>({
  key: 'themeModeState',
  get: ({ get }) => get(themeState).mode,
  set: ({ set }, newValue) => {
    const mode = newValue as Mode;
    set(themeState, (prevState): State => ({ ...prevState, mode }));
  },
});

/** 현재 시스템 테마 설정 */
export const setSystemTheme = selector<State | System>({
  key: 'themeSystemState',
  get: ({ get }) => get(themeState).system,
  set: ({ set }, newValue) => {
    const system = newValue as System;
    set(themeState, (prevState): State => ({ ...prevState, system }));
  },
});

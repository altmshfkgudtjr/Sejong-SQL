import { selector } from 'recoil';
import { uiState } from './ui';
// types
import { State, SideState } from './ui';

/** 현재 사이드바 상태 설정 */
export const setSideState = selector<SideState>({
  key: 'uiSideState',
  get: ({ get }) => get(uiState).side,
  set: ({ set }, newValue) => {
    const side = newValue as SideState;
    set(uiState, (prevState): State => ({ ...prevState, side }));
  },
});

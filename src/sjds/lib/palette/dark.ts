// types
import type { ThemeVariables } from 'sjds/types/Palette';

/** 다크 테마 색상표 */
const darkTheme: ThemeVariables = {
  // Primary
  primary: '#D6244A',

  // Background
  background: {
    bg1: '#151618',
    bg2: '#1F2022',
    bg3: '#2C2E32',
    bg4: '#3B3E45',
    bg5: '#4D5057',
  },

  // Text
  text: {
    f1: '#F2F2F2',
    f2: '#FFFFFF',
    f3: '#F6F6F6',
    f4: '#A9A9A9',
  },

  // Border
  border: {
    b1: '#969C9C',
    b2: '#43434A',
  },

  // Semantic
  semantic: {
    info: '#2680EB',
    success: '#2D9D78',
    warning: '#E68619',
    danger: '#E34850',

    white: '#FFFFFF',
    black: '#000000',
  },
};

export default darkTheme;

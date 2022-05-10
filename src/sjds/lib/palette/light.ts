// types
import type { ThemeVariables } from 'sjds/types/Palette';

/** 라이트 테마 색상표 */
const lightTheme: ThemeVariables = {
  // Primary
  primary: '#C21C3F',

  // Background
  background: {
    bg1: '#ffffff',
    bg2: '#FBFBFD',
    bg3: '#F1F1F8',
    bg4: '#EAEAF2',
    bg5: '#AFAFC0',
  },

  // Text
  text: {
    f1: '#484848',
    f2: '#000000',
    f3: '#313134',
    f4: '#BBBBCA',
  },

  // Border
  border: {
    b1: '#969C9C',
    b2: '#CECEF0',
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

export default lightTheme;

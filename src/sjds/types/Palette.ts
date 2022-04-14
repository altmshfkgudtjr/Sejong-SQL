/** 테마 분류 타입 */
export type Theme = 'light' | 'dark';

/** 색상표 타입 */
export type ThemeVariables = {
  // Primary
  primary: string;

  // Background
  background: {
    bg1: string;
    bg2: string;
    bg3: string;
    bg4: string;
    bg5: string;
  };

  // Text
  text: {
    f1: string;
    f2: string;
    f3: string;
    f4: string;
  };

  // Border
  border: {
    b1: string;
    b2: string;
  };

  // Semantic
  semantic: {
    info: string;
    success: string;
    warning: string;
    danger: string;

    white: string;
    black: string;
  };
};

/** 테마 색상표 타입 */
export type ThemePalette = Record<Theme, ThemeVariables>;

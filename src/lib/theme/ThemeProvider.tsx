import { ThemeProvider as SC_ThemeProvider } from 'styled-components';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// store
import { themeState } from 'store/system/theme';
import { setTheme, setSystemTheme } from 'store/system/theme.logic';
// lib
import * as cookieUtils from 'utils/cookie';
// styles
import themePalette from 'sjds/lib/palette';

const ThemeProvider = ({ themeType, children }) => {
  const currentTheme = useRecoilValue(themeState);
  const theme =
    currentTheme.system === 'Pending'
      ? themeType === 'dark'
        ? themePalette.dark
        : themePalette.light
      : currentTheme.mode === 'Dark'
      ? themePalette.dark
      : themePalette.light;

  const setMode = useSetRecoilState(setTheme);
  const setSystem = useSetRecoilState(setSystemTheme);

  /** 시스템 테마 감지 */
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setSystem('Dark');
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setSystem('Light');
    }

    setSystem('Light'); // 임시
  }, [setSystem]);

  /** Store에 테마 저장 */
  useEffect(() => {
    if (themeType === 'light') {
      return setMode('Light');
    }

    if (themeType === 'dark') {
      return setMode('Dark');
    }

    if (currentTheme.system === 'Light') {
      return setMode('Light');
    }

    if (currentTheme.system === 'Dark') {
      return setMode('Dark');
    }

    setMode('Default');
  }, [themeType, currentTheme.system, setMode]);

  /** 쿠키에 현재 테마 저장 */
  useEffect(() => {
    if (currentTheme.mode === 'Light') {
      cookieUtils.setCookie('theme', 'light');
    }

    if (currentTheme.mode === 'Dark') {
      cookieUtils.setCookie('theme', 'dark');
    }
  }, [currentTheme.mode]);

  return <SC_ThemeProvider theme={theme}>{children}</SC_ThemeProvider>;
};

export default ThemeProvider;

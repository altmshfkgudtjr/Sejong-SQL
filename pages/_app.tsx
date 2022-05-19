import { useState, useLayoutEffect } from 'react';
import Head from 'next/head';
import ThemeProvider from 'lib/theme';
import QueryProvider from 'lib/reactQuery';
import RecoilProvider from 'store';
import ModalProvider from 'components/containers/modals/ModalProvider';
import SnackbarProvider from 'components/containers/commons/SnackbarProvider';
// components
import { SpriteIcons, SpriteEmojis } from 'sjds/components/icons';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
// utils
import * as cookieUtils from 'utils/cookie';
import GlobalStyles from 'lib/theme/global';
// styles
import 'public/font.css';
// types
import type { CustomAppProps } from 'next/app';

const App = ({ Component, pageProps }: CustomAppProps) => {
  const [themeType, setThemeType] = useState(pageProps.theme);

  const { MetaTitle } = useMetaData();
  // useAuth();

  /** 공통 레이아웃 적용 */
  const getLayout = Component.getLayout || (page => page);

  useLayoutEffect(() => {
    const value = cookieUtils.getCookieFromClient('theme');
    setThemeType(v => (v ? v : value));
  }, []);

  return (
    <>
      {/* ------------------------------ Head ------------------------------ */}
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=yes, minimal-ui, viewport-fit=cover"
        />
      </Head>
      <MetaTitle content="세종대학교 SQL OJ System" />
      {/* ------------------------------ Main ------------------------------ */}
      <QueryProvider>
        <RecoilProvider>
          <ThemeProvider themeType={themeType}>
            {/* Global Styles */}
            <GlobalStyles />
            {/* Main App */}
            {getLayout(<Component {...pageProps} />)}
            {/* Modal */}
            <ModalProvider />
            {/* Snackbar */}
            <SnackbarProvider />
          </ThemeProvider>
        </RecoilProvider>
      </QueryProvider>
      {/* ------------------------------ Icons ------------------------------ */}
      <SpriteIcons />
      <SpriteEmojis />
    </>
  );
};

App.getInitialProps = async ({ ctx, Component }) => {
  let pageProps: any = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  const cookie = ctx?.req?.cookies;
  if (cookie) {
    Object.assign(pageProps, {
      theme: cookieUtils.getCookieFromServer('theme', ctx),
    });
  }

  return { pageProps };
};

export default App;

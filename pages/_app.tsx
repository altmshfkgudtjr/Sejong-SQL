import { useState, useLayoutEffect } from 'react';
import Head from 'next/head';
import {
  QueryProvider,
  RecoilProvider,
  ThemeProvider,
  ModalProvider,
  SnackbarProvider,
} from 'components/containers/providers';
// heads
import DefaultMeta from 'lib/head/DefaultMeta';
import Favicons from 'lib/head/Favicons';
// components
import { SpriteIcons, SpriteEmojis } from 'sjds/components/icons';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
// utils
import * as cookieUtils from 'utils/cookie';
// styles
import GlobalStyles from 'lib/GlobalStyles';
import 'public/font.css';
// types
import type { CustomAppProps } from 'next/app';

const App = ({ Component, pageProps }: CustomAppProps) => {
  const [themeType, setThemeType] = useState(pageProps.theme);

  const { MetaTitle } = useMetaData();

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
      <DefaultMeta />
      <Favicons />
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

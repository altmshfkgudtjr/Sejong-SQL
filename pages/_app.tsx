import Head from 'next/head';
import type { AppProps } from 'next/app';
import ThemeProvider from 'lib/theme/ThemeProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import RecoilProvider from 'store';
// components
import { SpriteIcons, SpriteEmojis } from 'sjds/components/icons';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
// utils
import * as cookieUtils from 'utils/cookie';
import GlobalStyles from 'lib/theme/global';
// styles
import 'public/font.css';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: CustomAppProps) => {
  const { MetaTitle } = useMetaData();

  /** 공통 레이아웃 적용 */
  const getLayout = Component.getLayout || (page => page);

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
      <QueryClientProvider client={queryClient}>
        <RecoilProvider>
          <ThemeProvider themeType={pageProps.theme}>
            <GlobalStyles />
            <>{getLayout(<Component {...pageProps} />)}</>
          </ThemeProvider>
        </RecoilProvider>
      </QueryClientProvider>
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

  const cookie = ctx.req.cookies;
  if (cookie) {
    Object.assign(pageProps, {
      theme: cookieUtils.getCookieFromServer('theme', ctx),
    });
  }

  return { pageProps };
};

/** App Props 커스텀 타입 */
interface CustomAppProps extends Omit<AppProps, 'Component'> {
  Component: AppProps['Component'] & { getLayout: Function };
}

export default App;

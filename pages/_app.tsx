import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import RecoilProvider from 'store';
import Head from 'next/head';
// components
import { SpriteIcons, SpriteEmojis } from 'sjds/components/icons';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
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
      <MetaTitle content="나의 부동산 투자 포트폴리오" />
      {/* ------------------------------ Main ------------------------------ */}
      <QueryClientProvider client={queryClient}>
        <RecoilProvider>
          <>{getLayout(<Component {...pageProps} />)}</>
        </RecoilProvider>
      </QueryClientProvider>
      {/* ------------------------------ Icons ------------------------------ */}
      <SpriteIcons />
      <SpriteEmojis />
    </>
  );
};

/** App Props 커스텀 타입 */
interface CustomAppProps extends Omit<AppProps, 'Component'> {
  Component: AppProps['Component'] & { getLayout: Function };
}

export default App;

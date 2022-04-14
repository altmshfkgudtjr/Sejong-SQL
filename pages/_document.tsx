import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
// head
import DefaultMeta from 'lib/head/DefaultMeta';

class MyDocument extends Document {
  /*======= styled-components SSR 적용 =======*/
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  /*=========================================*/

  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="utf-8" />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <DefaultMeta />
          <link rel="shortcut icon" href={``} />
          <link rel="canonical" href={process.env.NEXT_PUBLIC_DEFAULT_HOST} />
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_ASSET_HOST} crossOrigin="true" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

import Head from 'next/head';

/**
 * 메타 데이터 Hook
 */
const useMetaData = () => {
  const MetaTitle = ({ content }) => {
    return (
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_BRAND_ENG} | {content}
        </title>
        <meta property="og:title" content={content} />
        <meta name="twitter:title" content={content} />
        <meta name="facebook:title" content={content} />
      </Head>
    );
  };

  const MetaDescription = ({ content }) => (
    <Head>
      <meta name="description" content={content} />
      <meta property="og:descripction" content={content} />
      <meta name="twitter:description" content={content} />
      <meta name="facebook:description" content={content} />

      <meta name="twitter:card" content={content} />
      <meta name="facebook:card" content={content} />
    </Head>
  );

  const MetaImage = ({
    content = `${process.env.NEXT_PUBLIC_ASSET_HOST}/img/class/classu.png`,
  }) => (
    <Head>
      <meta property="og:image" content={content} />
      <meta name="twitter:image" content={content} />
      <meta name="facebook:image" content={content} />
    </Head>
  );

  return {
    MetaTitle,
    MetaDescription,
    MetaImage,
  };
};

export default useMetaData;

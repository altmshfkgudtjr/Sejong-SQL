import Head from "next/head";

/** Default 메타 데이터 */
const DefaultMeta = () => {
  return (
    <Head>
      <meta name="description" content={`세종대학교 SQL OJ System, ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta name="keywords" content={`세종대학교, OJ, SQL, Query, 쿼리`} />
			<meta name="copyright" content={`Copyright © 2022 ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta name="author" content={process.env.NEXT_PUBLIC_BRAND_KOR} />
      {/* ------------------------ Default ------------------------ */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_DEFAULT_HOST} />
      <meta property="og:site_name" content={process.env.NEXT_PUBLIC_BRAND_KOR} />
      <meta property="og:title" content={`${process.env.NEXT_PUBLIC_BRAND_KOR} | 세종대학교 SQL OJ System`} />
      <meta property="og:description" content={`세종대학교 SQL OJ System, ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_ASSET_HOST}/img/class/ogImage.png`} />
      {/* ------------------------ Twitter ------------------------ */}
      <meta name="twitter:card" content={`세종대학교 SQL OJ System, ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta name="twitter:domain" content={process.env.NEXT_PUBLIC_DEFAULT_HOST} />
      <meta name="twitter:title" content={`${process.env.NEXT_PUBLIC_BRAND_KOR} | 세종대학교 SQL OJ System`} />
      <meta name="twitter:description" content={`세종대학교 SQL OJ System, ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_ASSET_HOST}/img/class/ogImage.png`} />
      {/* ------------------------ Facebook ----------------------- */}
      <meta name="facebook:card" content={`세종대학교 SQL OJ System, ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta name="twitter:domain" content={process.env.NEXT_PUBLIC_DEFAULT_HOST} />
      <meta name="facebook:title" content={`${process.env.NEXT_PUBLIC_BRAND_KOR} | 세종대학교 SQL OJ System`} />
      <meta name="facebook:description" content={`세종대학교 SQL OJ System, ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta name="facebook:image" content={`${process.env.NEXT_PUBLIC_ASSET_HOST}/img/class/ogImage.png`} />
    </Head>
  );
};

export default DefaultMeta;

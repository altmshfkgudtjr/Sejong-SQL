import styled from 'styled-components';

/**
 * 로고
 * @param props
 * @param props.type 타입
 * @param props.w 가로 길이
 * @param props.h 세로 길이
 * @param props.isLinking a 태그 여부
 */
const Logo = ({ type = 'Black', w, h, isLinking = true }: Props) => {
  const logoURL =
    type === 'Black'
      ? `${process.env.NEXT_PUBLIC_ASSET_HOST}images/logo_black.png`
      : `${process.env.NEXT_PUBLIC_ASSET_HOST}images/logo_white.png`;

  const Layout = ({ children }) => {
    if (isLinking) {
      return <Link href="">{children}</Link>;
    }
    return <Wrapper>{children}</Wrapper>;
  };

  return (
    <Layout>
      <Image src={logoURL} alt={`${process.env.NEXT_PUBLIC_BRAND_ENG} 로고`} w={w} h={h} />
    </Layout>
  );
};

const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img<{
  w?: number;
  h?: number;
}>`
  width: ${({ w }) => (w ? `${w}px` : '100%')};
  height: ${({ h }) => (h ? `${h}px` : '100%')};
`;

type Props = {
  type?: 'Black' | 'White';
  w?: number;
  h?: number;
  isLinking?: boolean;
};

export default Logo;

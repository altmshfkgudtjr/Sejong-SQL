import styled from 'styled-components';

/**
 * 로고
 * @param props
 * @param props.w 가로 길이
 * @param props.h 세로 길이
 */
const Logo = ({ w, h }: Props) => {
  return (
    <Link href="/">
      <Image
        src={`${process.env.NEXT_PUBLIC_ASSET_HOST}/images/OASIS-Logo-e-primary.png`}
        alt={`${process.env.NEXT_PUBLIC_BRAND_ENG} 로고`}
        w={w}
        h={h}
      />
    </Link>
  );
};

const Link = styled.a`
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
  w?: number;
  h?: number;
};

export default Logo;

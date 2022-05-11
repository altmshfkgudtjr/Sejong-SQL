import styled from 'styled-components';
import Link from 'next/link';
// styles
import { typo } from 'sjds';

const Footer = () => {
  return (
    <Wrapper>
      <span>© Team IML.</span>
      <div>
        <Link href="/">
          <a>개인정보처리방침</a>
        </Link>
        <Link href="/">
          <a>이용약관</a>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 60px;
  margin-top: 40px;

  & > span {
    ${typo.body3};
    color: ${({ theme }) => theme.text.f3};
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;

    a {
      ${typo.subvalue3};
      color: ${({ theme }) => theme.text.f4};
    }
  }
`;

export default Footer;

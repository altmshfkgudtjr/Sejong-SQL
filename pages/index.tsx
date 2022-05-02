import styled, { useTheme } from 'styled-components';
import Link from 'next/link';
// components
import Layout from 'components/layouts';
import Badge from 'components/atoms/Badge';
import RadioButton from 'components/atoms/inputs/RadioButton';
import Footer from 'components/containers/Footer';
import { FillButton, TextButton } from 'sjds/components/buttons';
import { MainLayout } from 'sjds/layouts';
// style
import { mediaQuery, typo } from 'sjds';

/** 홈 페이지 */
const HomePage = () => {
  const currentTheme = useTheme();
  const isLogined = false;

  return (
    <>
      <Wrapper>
        <section>
          <Title>
            세종대학교
            <br />
            <strong>SQL</strong>과 만나다
          </Title>
          <Link href="/dashboard" passHref>
            <FillButton
              forwardedAs="a"
              color={currentTheme.primary}
              size="Regular"
              style={{ width: '180px' }}
            >
              대시보드로 이동하기
            </FillButton>
          </Link>
          {!isLogined && (
            <LoginBox>
              이미 회원가입 하셨나요?
              <Link href="/sign-in" passHref>
                <SignInButton forwardedAs="a" size="Regular">
                  로그인
                </SignInButton>
              </Link>
            </LoginBox>
          )}
        </section>
        <section>
          <InfoBox>
            <InfoRow>
              <RadioButton name="info_1" label="info_1" checked readOnly />
              DB의 가상환경을 통해서 언제나 쿼리 테스트 가능
            </InfoRow>
            <InfoRow>
              <RadioButton name="info_2" label="info_2" checked readOnly />내 쿼리에 대한 자체
              솔루션 통해서 성능 분석
            </InfoRow>
            <InfoRow>
              <RadioButton name="info_3" label="info_3" checked readOnly />
              시험 환경을 미리 효과적으로 연습 가능
            </InfoRow>
            <InfoRow>
              <RadioButton name="info_4" label="info_4" checked readOnly />
              인터넷만 연결 된다면 언제 어디서나 연습 가능
            </InfoRow>
            <InfoRow>
              <RadioButton name="info_5" label="info_5" checked readOnly />좀 더 편리한 사용자
              친화적 인터페이스를 사용
            </InfoRow>
          </InfoBox>
        </section>
      </Wrapper>

      <ParagraphBox>
        <Badge type="Info">💡 5초 지식</Badge>
        San Jose 연구소에서 세계최초 관계형 데이터베이스인 'System R'가 개발되었습니다.
      </ParagraphBox>

      <Footer />
    </>
  );
};

HomePage.getLayout = page => {
  return <Layout>{page}</Layout>;
};

const Wrapper = styled(MainLayout)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  gap: 60px;
  width: 100%;
  max-width: 1240px;
  padding: 0 20px;
  margin: 80px auto 0;

  & > div {
    flex: 1 0 auto;
    width: 100%;
  }

  ${mediaQuery.large} {
    flex-direction: row;
    gap: 0px;
    margin: 160px auto 0;

    & > div {
      width: 50%;
    }
  }
`;

const Title = styled.h1`
  ${typo.headline1};
  font-size: 64px;
  line-height: calc(100% + 24px);
  margin-bottom: 40px;

  & > strong {
    color: #c21c3f;
  }
`;

const LoginBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 30px;

  & > a {
    flex: 0 0 auto;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 600px;
  padding: 40px 60px;
  margin: auto;
  border-radius: 16px;
  box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  & > label {
    cursor: default;
  }
`;

const ParagraphBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: fit-content;
  padding: 32px 40px;
  margin: 80px auto 0;
  background-color: #ffffff;
  border-radius: 24px;
  box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.08);

  ${mediaQuery.large} {
    margin: 160px auto 0;
  }
`;

const SignInButton = styled(TextButton)`
  flex-grow: 0;
  width: 72p;
`;

export default HomePage;

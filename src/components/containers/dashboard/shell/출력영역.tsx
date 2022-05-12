import styled, { useTheme } from 'styled-components';
// components
import Badge from 'components/presenters/dashboard/shell/Badge';
import { FillButton } from 'sjds/components/buttons';

const 출력영역 = () => {
  const currentTheme = useTheme();

  return (
    <Wrapper>
      <Badge text="실행 결과" />

      <Body></Body>

      <Footer>
        <Button color={currentTheme.primary} size="Regular">
          쿼리 실행
        </Button>
        <Button color={currentTheme.primary} size="Regular">
          제출하기
        </Button>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;
`;

const Body = styled.div`
  flex: 1;
`;

const Footer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  position: sticky;
  padding: 16px 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.background.bg3};
`;

const Button = styled(FillButton)`
  flex: 0 1 auto;
  width: 120px;
`;

export default 출력영역;

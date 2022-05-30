import styled, { useTheme } from 'styled-components';
// components
import { TextButton } from 'sjds/components/buttons';
import EnvHead from 'components/presenters/modals/env/EnvHead';
import EnvItem from 'components/presenters/modals/env/EnvItem';
// hooks
import * as useEnvironmentController from 'hooks/controllers/useEnvironmentController';
// styles
import { mediaQuery, boxShadow, typo } from 'sjds';

/** 가상 데이터베이스 선택 모달 */
const EnvModal = ({ args }) => {
  const { classId, onChangeEnv } = args;

  const currentTheme = useTheme();
  const { data: classEnvData } = useEnvironmentController.GetClassEnvList(classId);
  const { data: myEnvData } = useEnvironmentController.GetMyEnvList();

  console.log(classEnvData, myEnvData);

  return (
    <Wrapper>
      <Header>
        <Title>가상 데이터베이스</Title>
        <div>
          <TextButton size="ExtraSmall" color={currentTheme.text.f4}>
            삭제
          </TextButton>
          <TextButton size="ExtraSmall" color={currentTheme.semantic.info}>
            새로 만들기
          </TextButton>
        </div>
      </Header>

      <Section>
        <SectionTitle>클래스 소속</SectionTitle>
        <Table>
          <thead>
            <EnvHead type="Class" checked={false} onChange={() => null} />
          </thead>
          <tbody>
            {classEnvData?.result?.map(d => (
              <EnvItem key={d.id} data={d} checked={false} onChange={() => null} />
            ))}
          </tbody>
        </Table>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100vh;
  padding: 32px 0;
  background-color: ${({ theme }) => theme.background.bg2};
  ${boxShadow.e2};
  overflow-y: auto;

  ${mediaQuery.medium} {
    width: 600px;
    height: 800px;
    max-height: 100%;
    border-radius: 12px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 32px;

  & > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }
`;

const Title = styled.h1`
  ${typo.headline1};
  color: ${({ theme }) => theme.text.f2};
`;

const Section = styled.div`
  margin-bottom: 32px;
  overflow-x: auto;
  overflow-y: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SectionTitle = styled.h2`
  padding: 0 20px;
  margin-bottom: 16px;
  ${typo.subtitle1};
  color: ${({ theme }) => theme.text.f2};
`;

const Table = styled.table`
  padding: 0 20px;
  white-space: nowrap;
`;

export default EnvModal;

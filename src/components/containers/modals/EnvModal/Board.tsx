import styled, { useTheme } from 'styled-components';
import { useState, useEffect } from 'react';
// components
import { TextButton } from 'sjds/components/buttons';
import EnvHead from 'components/presenters/modals/env/EnvHead';
import EnvItem from 'components/presenters/modals/env/EnvItem';
// utils
import { ArrayByNumber } from 'utils/helpers/array';
// hooks
import * as useEnvironmentController from 'hooks/controllers/useEnvironmentController';
// styles
import { typo } from 'sjds';
// types
import { isTypeMyEnvironment } from 'types/guards/envrionment';

/** 가상 데이터베이스 선택 모달 - 보드 */
const EnvModalBoard = ({ onNext, onCloseModal, args }) => {
  const { classId, onChangeEnv } = args;

  const currentTheme = useTheme();
  const { data: classEnvData, refetch: envRefetch } = useEnvironmentController.GetClassEnvList(
    classId,
    { refetchInterval: 5000 },
  );
  const { data: myEnvData, refetch: myEnvRefetch } = useEnvironmentController.GetMyEnvList({
    refetchInterval: 5000,
  });
  const { mutateAsync: deleteMutate } = useEnvironmentController.DeleteEnv();
  const { mutateAsync: removeMutate } = useEnvironmentController.UnconnectEnvToClassClass();

  const [classEnvList, setClassEnvList] = useState<boolean[]>([]);
  const [myEnvList, setMyEnvList] = useState<boolean[]>([]);

  const isEnabledClassEnvRemove = classEnvList.some(v => v);
  const isEnabledMyEnvRemove = myEnvList.some(v => v);

  const onToggleAll = (type: 'Class' | 'My') => {
    const changedValue = array => {
      if (array.indexOf(false) >= 0) {
        return array.map(() => true);
      } else {
        return array.map(() => false);
      }
    };

    if (type === 'Class') {
      setClassEnvList(changedValue);
    }
    if (type === 'My') {
      setMyEnvList(changedValue);
    }
  };

  const onToggle = (type: 'Class' | 'My', idx: number) => {
    const changedValue = array => {
      let changed = [...array];
      changed[idx] = !changed[idx];
      return changed;
    };

    if (type === 'Class') {
      setClassEnvList(changedValue);
    }
    if (type === 'My') {
      setMyEnvList(changedValue);
    }
  };

  const onSelect = env => {
    const env_ = env;
    if (isTypeMyEnvironment(env)) {
      Object.assign(env_, { owner: '' });
    }
    onChangeEnv && onChangeEnv(env_);
    onCloseModal();
  };

  const onRemoveClassEnv = async () => {
    if (!confirm('분반에서 가상 데이터베이스를 제거합니다. 진행하시곘습니까?')) {
      return;
    }

    if (!classEnvData?.result) {
      return;
    }

    const filtered = classEnvData.result.filter((env, idx) => classEnvList[idx]);
    const promiseList = filtered.map(env => removeMutate({ classId, envId: env.id }));
    await Promise.all(promiseList);
    envRefetch();
  };

  const onDeleteMyEnv = async () => {
    if (!confirm('분반과 연결된 가상 데이터베이스가 모두 제거됩니다. 진행하시곘습니까?')) {
      return;
    }

    if (!myEnvData?.result) {
      return;
    }

    const filtered = myEnvData.result.filter((env, idx) => myEnvList[idx]);
    const promiseList = filtered.map(env => deleteMutate({ envId: env.id }));
    await Promise.all(promiseList);
    envRefetch();
    myEnvRefetch();
  };

  useEffect(() => {
    if (!classEnvData?.result) {
      return;
    }
    const length = classEnvData.result.length;
    setClassEnvList(ArrayByNumber(length, false));
  }, [classEnvData]);

  useEffect(() => {
    if (!myEnvData?.result) {
      return;
    }
    const length = myEnvData.result.length;
    setMyEnvList(ArrayByNumber(length, false));
  }, [myEnvData]);

  return (
    <Wrapper>
      <Header>
        <Title>가상 데이터베이스</Title>
        <div>
          <TextButton onClick={onNext} size="ExtraSmall" color={currentTheme.semantic.info}>
            새로 만들기
          </TextButton>
        </div>
      </Header>

      {classEnvList.length > 0 && (
        <Section>
          <SectionTitle>
            클래스 소속
            <div>
              <TextButton
                onClick={onRemoveClassEnv}
                size="ExtraSmall"
                color={currentTheme.semantic.danger}
                disabled={!isEnabledClassEnvRemove}
              >
                제거
              </TextButton>
            </div>
          </SectionTitle>
          <TableWrapper>
            <Table>
              <thead>
                <EnvHead
                  type="Class"
                  checked={classEnvList.every(v => v === true)}
                  onChange={() => onToggleAll('Class')}
                />
              </thead>
              <tbody>
                {classEnvData?.result?.map((d, idx) => (
                  <EnvItem
                    key={d.id}
                    data={d}
                    checked={classEnvList[idx]}
                    onChange={() => onToggle('Class', idx)}
                    onSelect={() => onSelect(d)}
                  />
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        </Section>
      )}

      {myEnvList.length > 0 && (
        <Section>
          <SectionTitle>
            내 소속
            <div>
              <TextButton
                onClick={onDeleteMyEnv}
                size="ExtraSmall"
                color={currentTheme.semantic.danger}
                disabled={!isEnabledMyEnvRemove}
              >
                삭제
              </TextButton>
            </div>
          </SectionTitle>
          <TableWrapper>
            <Table>
              <thead>
                <EnvHead
                  type="My"
                  checked={myEnvList.every(v => v === true)}
                  onChange={() => onToggleAll('My')}
                />
              </thead>
              <tbody>
                {myEnvData?.result?.map((d, idx) => (
                  <EnvItem
                    key={d.id}
                    data={d}
                    checked={myEnvList[idx]}
                    onChange={() => onToggle('My', idx)}
                    onSelect={() => onSelect(d)}
                  />
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        </Section>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 20px;

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
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  position: sticky;
  top: 0;
  left: 0;
  padding: 4px 20px;
  margin-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.border.b2};
  background-color: ${({ theme }) => theme.background.bg2};
  ${typo.subtitle1};
  color: ${({ theme }) => theme.text.f2};
  z-index: 1;
`;

const TableWrapper = styled.div`
  padding: 0 4px;
  overflow-x: auto;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Table = styled.table`
  white-space: nowrap;
`;

export default EnvModalBoard;

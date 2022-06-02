import styled from 'styled-components';
import { useEffect, useLayoutEffect, useState } from 'react';
// components
import { FillButton } from 'sjds/components/buttons';
import Badge from 'components/presenters/dashboard/shell/Badge';
import ProblemTitle from 'components/presenters/dashboard/shell/ProblemTitle';
import ProblemContent from 'components/presenters/dashboard/shell/ProblemContent';
// hooks
import useModal from 'hooks/dom/useModal';
// styles
import { typo } from 'sjds';
// types
import type { Warning } from 'types/api/problem';

const 문제출제 = ({
  initData,
  classId,
  envName,
  warningList,
  onChangeEnv,
  onChangeValue,
  onChangeWarningList,
}: Props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { pushModal } = useModal();

  const onChangeTitle = e => setTitle(e.target.value);
  const onChangeContent = e => setContent(e.target.value);

  const onClickEnv = () => {
    pushModal({
      name: 'EnvModal',
      args: {
        classId,
        onChangeEnv,
      },
    });
  };

  const onClickWarning = () => {
    pushModal({
      name: 'AdvancedConditionModal',
      args: {
        warningIdList: warningList.map(v => v.id),
        onChangeWarningList,
      },
    });
  };

  useLayoutEffect(() => {
    initData?.title && setTitle(initData.title);
    initData?.content && setContent(initData.content);
  }, [initData]);

  useEffect(() => {
    onChangeValue(title, content);
  }, [onChangeValue, title, content]);

  return (
    <Wrapper>
      <EnvButton size="ExtraSmall" onClick={onClickEnv}>
        {envName ? `선택된 가상 데이터베이스 : ${envName}` : '사용할 가상 데이터베이스 선택'}
      </EnvButton>

      <EnvButton size="ExtraSmall" onClick={onClickWarning}>
        {warningList.length > 0
          ? `선택된 고급 조건 : 총 ${warningList.length}개`
          : '고급 조건 선택'}
      </EnvButton>

      <TitleWrapper>
        <ProblemTitle isInput onChange={onChangeTitle} />
      </TitleWrapper>

      <Badge text="문제 설명" />

      <ProblemContent isInput onChange={onChangeContent} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 16px;
`;

const EnvButton = styled(FillButton)`
  flex: 0 1 auto;
  width: fit-content;
  margin-left: -12px;
  margin-bottom: 8px;
  ${typo.value3};
  color: ${({ theme }) => theme.semantic.info};
`;

type Props = {
  initData?: {
    title?: string;
    content?: string;
  };
  classId: number;
  envName: string;
  warningList: Warning[];
  onChangeEnv: (env: any) => void;
  onChangeValue: (title: string, content: string) => void;
  onChangeWarningList: (value: Warning[]) => void;
};

export default 문제출제;

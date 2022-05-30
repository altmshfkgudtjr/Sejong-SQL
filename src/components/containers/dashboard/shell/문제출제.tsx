import styled from 'styled-components';
import { useEffect, useState } from 'react';
// components
import { FillButton } from 'sjds/components/buttons';
import Badge from 'components/presenters/dashboard/shell/Badge';
import ProblemTitle from 'components/presenters/dashboard/shell/ProblemTitle';
import ProblemContent from 'components/presenters/dashboard/shell/ProblemContent';
// hooks
import useModal from 'hooks/dom/useModal';
// styles
import { typo } from 'sjds';

/**
 * 문제출제
 * @param props
 * @param props.onChangeValue
 */
const 문제출제 = ({ classId, onChangeEnv, onChangeValue }: Props) => {
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

  useEffect(() => {
    onChangeValue(title, content);
  }, [onChangeValue, title, content]);

  return (
    <Wrapper>
      <EnvButton size="ExtraSmall" onClick={onClickEnv}>
        사용할 가상 데이터베이스 선택
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
  margin-bottom: 20px;
  ${typo.value3};
  color: ${({ theme }) => theme.semantic.info};
`;

type Props = {
  classId: number;
  onChangeEnv: (env: any) => void;
  onChangeValue: (title: string, content: string) => void;
};

export default 문제출제;

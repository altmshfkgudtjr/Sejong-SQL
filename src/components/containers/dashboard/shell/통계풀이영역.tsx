import styled from 'styled-components';
// components
import Badge from 'components/presenters/dashboard/shell/Badge';
import CodeEditor from 'components/presenters/dashboard/shell/CodeEditor';

const 통계풀이영역 = ({ initQuery, onChangeValue }: Props) => {
  const onClick = () => {
    const target: any = document.querySelector('[contenteditable]');
    if (!target) {
      return;
    }

    target.focus();
  };

  return (
    <Wrapper onClick={onClick}>
      <Badge text="쿼리 작성" />

      <CodeEditor disabled defaultValue={initQuery} onChangeValue={onChangeValue} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: fit-content;
  min-width: 100%;
  height: 100%;
  overflow-x: auto;
  cursor: text;
`;

type Props = {
  initQuery?: string;
  onChangeValue: (value: string) => void;
};

export default 통계풀이영역;

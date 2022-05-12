import styled from 'styled-components';
// components
import Badge from 'components/presenters/dashboard/shell/Badge';
import CodeEditor from 'components/presenters/dashboard/shell/CodeEditor';

const 풀이영역 = () => {
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

      <CodeEditor />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 100%;
  cursor: text;
`;

export default 풀이영역;

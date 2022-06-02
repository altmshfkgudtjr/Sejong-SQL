import styled from 'styled-components';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
// utils
import { ArrayByNumber } from 'utils/helpers/array';
// styles
import { typo } from 'sjds';

/**
 * 코드 에디터
 */
const CodeEditor = ({ defaultValue = '', onChangeValue }: Props) => {
  const shell = useRef<HTMLDivElement>(null);

  const [lineCount, setLineCount] = useState(1);
  const [lineComponentList, setLineComponentList] = useState<JSX.Element[]>([]);

  const checkLineCount = () => {
    if (!shell.current) {
      return;
    }

    const count = shell.current.childNodes.length;
    setLineCount(count === 0 ? 1 : count);
  };

  const onInput = e => onChangeValue(e.target.innerText);

  const onKeyDown = e => {
    if (e.code === 'Backspace' && e.target.innerHTML === '<div><br></div>') {
      e.preventDefault();
    }

    if (e.code === 'Tab') {
      e.preventDefault();
      const blank = ' ';
      const value = blank.repeat(4);
      window.document.execCommand('insertText', false, value);
    }

    if (e.code === 'Enter') {
      e.preventDefault();
      window.document.execCommand('insertText', false, '\n');
    }

    checkLineCount();
  };

  const onKeyUp = e => {
    if (e.target.innerHTML === '' || e.target.innerHTML === '<br>') {
      e.target.innerHTML = '<div><br></div>';
      setLineCount(1);
    }

    if (e.target.innerHTML === '<br><div><br></div>') {
      e.target.innerHTML = '<div><br></div><div><br></div>';
      setLineCount(1);
    }

    checkLineCount();
  };

  const onPaste = e => {
    if (e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) {
      e.preventDefault();
      var text = e.originalEvent.clipboardData.getData('text/plain');
      window.document.execCommand('insertText', false, text);
    } else if (e.clipboardData && e.clipboardData.getData) {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');
      window.document.execCommand('insertText', false, text);
    }
  };

  useLayoutEffect(() => {
    if (!shell.current) {
      return;
    }

    shell.current.innerHTML = defaultValue.replaceAll('\n', '<br>');
    defaultValue && checkLineCount();
  }, [defaultValue]);

  useLayoutEffect(() => {
    setLineComponentList(
      ArrayByNumber(lineCount).map((_, idx) => <Number key={idx}>{idx + 1}</Number>),
    );
  }, [lineCount]);

  useEffect(() => {
    if (!shell.current) {
      return;
    }

    shell.current.focus();
  }, []);

  return (
    <Wrapper>
      <NumberArea>{lineComponentList}</NumberArea>
      <CodeArea
        ref={shell}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        onInput={onInput}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onPaste={onPaste}
      >
        <div>
          <br />
        </div>
      </CodeArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
`;

const NumberArea = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 24px;
  margin: 0 8px;
`;

const Number = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin: 4px 0;
  ${typo.value3};
  color: ${({ theme }) => theme.text.f4};
`;

const CodeArea = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  outline: none;
  white-space: nowrap;
  ${typo.body1};
  color: ${({ theme }) => theme.text.f2};
  line-height: 32px;

  & > text,
  & > div {
    width: 100%;
    color: inherit;
    line-height: inherit;
  }
`;

type Props = {
  defaultValue?: string;
  onChangeValue: (value: string) => void;
};

export default CodeEditor;

import styled from 'styled-components';
import { useRef } from 'react';
// styles
import { typo } from 'sjds';
// types
import type { InputHTMLAttributes } from 'react';

/**
 * 쉘 - 문제 설명
 * @param props
 * @param props.content 문제 설명
 * @param props.isInput 입력창으로 전환 여부
 */
const ProblemContent = ({ content, isInput = false, ...props }: Props) => {
  const target = useRef<HTMLTextAreaElement>(null);

  const onInput = e => {
    e.target.parentNode.dataset.value = e.target.value;
  };

  const onFocus = () => {
    if (!target.current) {
      return;
    }

    target.current.focus();
  };

  return (
    <Wrapper onClick={onFocus}>
      {isInput && (
        <Label>
          <Textarea
            ref={target}
            placeholder="문제 설명을 작성해주세요"
            onInput={onInput}
            rows={1}
            {...props}
          />
        </Label>
      )}
      {!isInput && <Content>{content}</Content>}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  flex: 1;
  width: 100%;
  cursor: text;
`;

const Content = styled.div`
  white-space: pre-wrap;
  ${typo.body3};
  color: ${({ theme }) => theme.text.f1};
`;

const Label = styled.label`
  display: inline-grid;
  vertical-align: top;
  align-items: stretch;
  position: relative;
  width: 100%;
  border: none;

  &::after,
  textarea {
    ${typo.body2};
    grid-area: 2 / 1;
    background: none;
    appearance: none;
  }

  &::after {
    content: attr(data-value) ' ';
    visibility: hidden;
    white-space: pre-wrap;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  white-space: pre-wrap;
  background-color: transparent;
  ${typo.body2};
  color: ${({ theme }) => theme.text.f1};
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.text.f4};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

type Props = {
  content?: string;
  isInput?: boolean;
} & InputHTMLAttributes<HTMLTextAreaElement>;

export default ProblemContent;

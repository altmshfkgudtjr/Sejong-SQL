import styled from 'styled-components';
// styles
import { typo, lib } from 'sjds';
// types
import type { InputHTMLAttributes } from 'react';

/**
 * 쉘 - 문제 제목
 * @param props
 * @param props.title 문제제목
 * @param props.isInput 입력창으로 전환 여부
 */
const ProblemTitle = ({ title, isInput = false, ...props }: Props) => {
  const onKeyUp = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      return;
    }

    e.target.style.height = `auto`;
    const scrollHeight = e.target.scrollHeight;
    e.target.style.height = `${scrollHeight + 36}px`;
  };

  return (
    <Wrapper>
      {isInput && (
        <Input
          placeholder="문제 이름"
          maxLength={50}
          onKeyDown={onKeyUp}
          onKeyUp={onKeyUp}
          rows={1}
          {...props}
        />
      )}
      {!isInput && <Title>{title}</Title>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  ${lib.textLineClamp(2)};
`;

const Title = styled.h1`
  ${typo.headline1};
  font-weight: 400;
  color: ${({ theme }) => theme.text.f1};
`;

const Input = styled.textarea`
  width: 100%;
  height: 72px;
  ${typo.headline1};
  font-weight: 400;
  background-color: transparent;
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
  title?: string;
  isInput?: boolean;
} & InputHTMLAttributes<HTMLTextAreaElement>;

export default ProblemTitle;

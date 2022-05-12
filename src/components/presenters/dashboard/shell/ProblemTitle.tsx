import styled from 'styled-components';
// styles
import { typo, lib } from 'sjds';

/**
 * 쉘 - 문제 제목
 * @param props
 * @param props.title 문제제목
 */
const ProblemTitle = ({ title }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${lib.textLineClamp(2)};
`;

const Title = styled.h1`
  ${typo.headline1};
  font-weight: 400;
  color: ${({ theme }) => theme.text.f1};
`;

export default ProblemTitle;

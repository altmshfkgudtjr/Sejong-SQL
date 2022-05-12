import styled from 'styled-components';
// styles
import { typo } from 'sjds';

/**
 * 쉘 영역별 뱃지
 * @param props
 * @param props.text
 */
const Badge = ({ text }: Props) => {
  return <Wrapper>{text}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 16px;
  ${typo.value3};
  color: ${({ theme }) => theme.primary};
`;

type Props = {
  text: string;
};

export default Badge;

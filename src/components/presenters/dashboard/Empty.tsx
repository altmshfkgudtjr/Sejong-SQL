import styled, { useTheme } from 'styled-components';
// components
import { Icon } from 'sjds/components/icons';
// styles
import { typo, animations } from 'sjds';

/**
 * 비어있는 경우 표시 UI
 */
const Empty = ({ type = 'Problem', message }: Props) => {
  const currentTheme = useTheme();

  return (
    <Wrapper>
      <Icon
        name={type === 'Problem' ? 'ic_emptybox' : 'ic_emptynote'}
        width={128}
        height={128}
        fill={currentTheme.text.f1}
      />
      <Text>{message}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin-top: 200px;
  animation: 0.4s ease ${animations.fadeIn};
`;

const Text = styled.p`
  margin-top: 8px;
  ${typo.subtitle2};
  color: ${({ theme }) => theme.text.f1};

  mark {
    color: ${({ theme }) => theme.semantic.info};
  }
`;

type Props = {
  type?: 'Problem' | 'Week';
  message: string;
};

export default Empty;

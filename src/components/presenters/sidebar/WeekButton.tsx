import styled from 'styled-components';
// components
import { FillButton } from 'sjds/components/buttons';
// styles
import { typo } from 'sjds';

/**
 * 주차 버튼
 * @param props
 * @param props.selected 선택 여부
 * @param props.weekId 주차 ID
 * @param props.name 주차명
 */
const WeekButton = ({ selected, weekId, name }: Props) => {
  return <Wrapper selected={selected}>ㆍ {name}</Wrapper>;
};

const Wrapper = styled(FillButton)<{ selected?: boolean }>`
  justify-content: flex-start;
  width: 100%;
  padding: 10px 16px;
  border-radius: 0;
  ${typo.subtitle2};
  color: ${({ theme }) => theme.text.f1};
  background-color: ${({ selected, theme }) => selected && theme.background.bg2};
`;

type Props = {
  selected?: boolean;
  weekId: string;
  name: string;
};

export default WeekButton;

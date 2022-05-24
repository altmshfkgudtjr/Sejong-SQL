import styled, { css } from 'styled-components';
import Link from 'next/link';
// components
import { FillButton } from 'sjds/components/buttons';
// styles
import { typo, lib } from 'sjds';

/**
 * 주차 버튼
 * @param props
 * @param props.selected 선택 여부
 * @param props.classId 분반 ID
 * @param props.weekId 주차 ID
 * @param props.name 주차명
 */
const WeekButton = ({ selected, classId, weekId, name }: Props) => {
  return (
    <Link href={`/dashboard/${classId}/${weekId}`} passHref>
      <Wrapper as="a" selected={selected}>
        ㆍ {name}
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled(FillButton)<{ selected?: boolean }>`
  justify-content: flex-start;
  width: 100%;
  padding: 10px 16px;
  border-radius: 0;
  ${typo.subtitle2};
  color: ${({ theme }) => theme.text.f1};
  background-color: ${({ selected, theme }) => selected && theme.background.bg2};

  ${({ theme }) =>
    lib.onlyHover(css`
      color: ${theme.semantic.info};

      &::before {
        background-color: rgba(0, 0, 0, 0);
      }
    `)}
`;

type Props = {
  selected?: boolean;
  classId: number;
  weekId: number;
  name: string;
};

export default WeekButton;

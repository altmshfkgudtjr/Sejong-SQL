import styled, { css } from 'styled-components';
import Link from 'next/link';
// components
import RadioButton from 'components/atoms/inputs/RadioButton';
// utils
import { commaFormatter } from 'utils/helpers/format';
// styles
import { typo, lib } from 'sjds';
// types
import type { Problem } from 'types/api/problem';

/**
 * 문제 카드
 * @param props
 * @param props.problem 문제 정보
 * @param props.classId 분반 ID
 * @param props.weekId 주차 ID
 */
const ProblemCard = ({ problem, classId, weekId, isManager }: Props) => {
  const accuracyColorType: ColorType =
    problem.status === 'No Submit'
      ? 'Default'
      : problem.status === 'Correct'
      ? 'Success'
      : 'Danger';

  const efficiencyColorType: ColorType =
    problem.status === 'No Submit'
      ? 'Default'
      : problem.problem_warnings === 0 ||
        (problem.user_warnings / problem.problem_warnings) * 100 >= 80
      ? 'Success'
      : (problem.user_warnings / problem.problem_warnings) * 100 >= 60
      ? 'Warning'
      : 'Danger';

  const url = isManager
    ? `/dashboard/${classId}/${weekId}/${problem.id}/edit`
    : `/dashboard/${classId}/${weekId}/${problem.id}`;

  return (
    <Link href={url} passHref>
      <Wrapper as="a">
        <LeftWrapper>
          <Name>{problem.title}</Name>
          <PassCount>총 만점자 {commaFormatter(10000)}명</PassCount>
        </LeftWrapper>

        <RightWrapper>
          <RadioButton checked readOnly disabled={problem.status === 'No Submit'} />
          <Box colorType={accuracyColorType}>
            <span>정확도</span>
            <p>{problem.status === 'Correct' ? 'PASS' : 'NON-PASS'}</p>
          </Box>
          <Box colorType={efficiencyColorType}>
            <span>효율성</span>
            <p>
              {problem.problem_warnings === 0
                ? problem.user_warnings
                : Math.floor((problem.user_warnings / problem.problem_warnings) * 100)}
            </p>
          </Box>
        </RightWrapper>
      </Wrapper>
    </Link>
  );
};

const Name = styled.p`
  ${typo.headline3};
  ${lib.textLineClamp(1)};
`;

const Wrapper = styled.button`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 120px;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border.b2};
  background-color: ${({ theme }) => theme.background.bg1};

  ${({ theme }) =>
    lib.onlyHover(css`
      ${Name} {
        color: ${theme.semantic.info};
      }
    `)};
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  height: 100%;
`;

const PassCount = styled.p`
  ${typo.body3};
  color: ${({ theme }) => theme.text.f4};
  ${lib.textLineClamp(1)};
  text-align: left;
`;

const Box = styled.div<{ colorType: ColorType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;

  & > span {
    ${typo.minimumtext};
    color: ${({ theme }) => theme.text.f2};
  }

  & > p {
    ${typo.headline1};
    color: ${({ colorType, theme }) => {
      const _ = {
        Default: theme.text.f4,
        Success: theme.semantic.success,
        Warning: theme.semantic.warning,
        Danger: theme.semantic.danger,
      };
      return _[colorType];
    }};
  }
`;

type ColorType = 'Default' | 'Success' | 'Warning' | 'Danger';

type Props = {
  problem: Problem;
  classId: string;
  weekId: string;
  isManager: boolean;
};

export default ProblemCard;

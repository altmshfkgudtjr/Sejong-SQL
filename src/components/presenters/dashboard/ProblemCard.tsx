import styled, { css } from 'styled-components';
import Link from 'next/link';
// components
import RadioButton from 'components/atoms/inputs/RadioButton';
// utils
import { commaFormatter } from 'utils/helpers/format';
// styles
import { typo, lib } from 'sjds';

/**
 * 문제 카드
 * @param props
 * @param props.problem 문제 정보
 * @param props.classId 분반 ID
 * @param props.weekId 주차 ID
 */
const ProblemCard = ({ problem, classId, weekId }: Props) => {
  const accuracyColorType: ColorType = !problem.isTry
    ? 'Default'
    : problem.scoreAccuracy
    ? 'Success'
    : 'Danger';

  const efficiencyColorType: ColorType = !problem.isTry
    ? 'Default'
    : problem.scoreEfficiency >= 90
    ? 'Success'
    : problem.scoreEfficiency >= 70
    ? 'Warning'
    : 'Danger';

  return (
    <Link href={`/dashboard/${classId}/${weekId}/${problem.id}`} passHref>
      <Wrapper as="a">
        <LeftWrapper>
          <Name>{problem.name}</Name>
          <PassCount>총 만점자 {commaFormatter(problem.passCount)}명</PassCount>
        </LeftWrapper>

        <RightWrapper>
          <RadioButton checked disabled={!problem.isTry} />
          <Box colorType={accuracyColorType}>
            <span>정확도</span>
            <p>{problem.scoreAccuracy ? 'PASS' : 'NON-PASS'}</p>
          </Box>
          <Box colorType={efficiencyColorType}>
            <span>효율성</span>
            <p>{problem.scoreEfficiency}</p>
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
  problem: {
    id: number;
    name: string;
    passCount: number;
    isTry: boolean;
    scoreAccuracy: boolean;
    scoreEfficiency: number;
  };
  classId: string;
  weekId: string;
};

export default ProblemCard;

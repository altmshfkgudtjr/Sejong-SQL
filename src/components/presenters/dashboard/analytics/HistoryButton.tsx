import styled from 'styled-components';
import Link from 'next/link';
// components
import { FillButton } from 'sjds/components/buttons';
// styles
import { typo } from 'sjds';

/**
 * 통계 히스토리
 * @param props
 * @param props.labelList 출력 데이터
 */
const HistoryButton = ({ labelList, classId, uspId, enabledButton }: Props) => {
  const LabelList = labelList.map((label, idx) => <span key={idx}>{label ? label : '-'}</span>);

  return (
    <Wrapper>
      <LabelWrapper>{LabelList}</LabelWrapper>

      {enabledButton && (
        <Link href={`/dashboard/${classId}/analytics/${uspId}`} passHref>
          <Button as="a" target="_blank" size="Regular">
            쿼리보기
          </Button>
        </Link>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: 44px;

  span {
    width: 100px;
    ${typo.value3};
    color: ${({ theme }) => theme.text.f1};

    &:nth-child(1) {
      width: 60px;
    }

    &:nth-child(2) {
      width: 80px;
    }

    &:nth-child(3) {
      width: 100px;
    }

    &:nth-child(4) {
      width: 200px;
      padding: 0 20px;
    }

    &:nth-child(5) {
      width: 160px;
    }

    &:nth-child(6) {
      width: 80px;
      text-transform: uppercase;
    }
  }

  & ~ & {
    margin-top: 8px;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Button = styled(FillButton)`
  flex: 0 1 auto;
  width: 120px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.semantic.white};
`;

type Props = {
  labelList: string[];
  classId?: number;
  uspId?: number;
  enabledButton?: boolean;
};

export default HistoryButton;

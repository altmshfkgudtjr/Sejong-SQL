import styled, { useTheme } from 'styled-components';
import { useState, useEffect } from 'react';
// components
import { FillButton } from 'sjds/components/buttons';
import TableHead from 'components/presenters/modals/advancedCondition/TableHead';
import TableItem from 'components/presenters/modals/advancedCondition/TableItem';
// hooks
import * as useProblemController from 'hooks/controllers/useProblemController';
// utils
import { ArrayByNumber } from 'utils/helpers/array';
// styles
import { mediaQuery, boxShadow, typo } from 'sjds';

/** 고급 조건 선택 모달 */
const AdvancedConditionModal = ({ onCloseModal, args }) => {
  const { warningIdList, onChangeWarningList } = args;

  const currentTheme = useTheme();

  const { data: warningData } = useProblemController.GetWarningList();

  const [warningList, setWarningList] = useState<boolean[]>([]);

  const onToggleAll = () => {
    const changedValue = array => {
      if (array.indexOf(false) >= 0) {
        return array.map(() => true);
      } else {
        return array.map(() => false);
      }
    };

    setWarningList(changedValue);
  };

  const onToggle = (idx: number) => {
    const changedValue = array => {
      let changed = [...array];
      changed[idx] = !changed[idx];
      return changed;
    };

    setWarningList(changedValue);
  };

  const onSelect = () => {
    const filtered = warningData?.result?.filter((_, idx) => warningList[idx]);
    filtered && onChangeWarningList && onChangeWarningList(filtered);
    onCloseModal();
  };

  useEffect(() => {
    if (!warningData?.result) {
      return;
    }
    const length = warningData.result.length;
    let array = ArrayByNumber(length, false);
    warningData.result.forEach((v, idx) => {
      if (warningIdList.indexOf(v.id) >= 0) {
        array[idx] = true;
      }
    });
    setWarningList(array);
  }, [warningData, warningIdList]);

  return (
    <Wrapper>
      <Header>
        <Title>고급 조건</Title>
      </Header>

      {warningList.length > 0 && (
        <Section>
          <TableWrapper>
            <table>
              <thead>
                <TableHead
                  checked={warningList.every(v => v === true)}
                  onChange={() => onToggleAll()}
                />
              </thead>
              <tbody>
                {warningData?.result?.map((d, idx) => (
                  <TableItem
                    key={d.id}
                    data={d}
                    checked={warningList[idx]}
                    onChange={() => onToggle(idx)}
                  />
                ))}
              </tbody>
            </table>
          </TableWrapper>
        </Section>
      )}

      <SelectButton onClick={onSelect} size="Small" color={currentTheme.primary}>
        선택 완료
      </SelectButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100vh;
  padding-bottom: 400px;
  background-color: ${({ theme }) => theme.background.bg2};
  ${boxShadow.e2};
  overflow-x: hidden;
  overflow-y: auto;

  ${mediaQuery.medium} {
    width: 600px;
    height: 800px;
    max-height: 100%;
    border-radius: 12px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 20px;

  & > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }
`;

const Title = styled.h1`
  ${typo.headline1};
  color: ${({ theme }) => theme.text.f2};
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const TableWrapper = styled.div`
  padding: 0 4px;
  overflow-x: auto;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SelectButton = styled(FillButton)`
  margin-left: 20px;
`;

export default AdvancedConditionModal;

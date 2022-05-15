import styled from 'styled-components';
import { useState } from 'react';
// components
import Layout from 'components/layouts';
import { DashboardLayout } from 'sjds/layouts';
import Sidebar from 'components/containers/Sidebar';
import Breadcrumb from 'components/containers/dashboard/Breadcrumb';
import TextInput from 'components/atoms/inputs/Text';
import CheckBox from 'components/atoms/inputs/Checkbox';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
// styles
import { typo } from 'sjds';

/** 분반 생성 페이지 */
const ClassCreatePage = () => {
  const [isChecked, setIsChecked] = useState(true);

  const { MetaTitle } = useMetaData();

  const onChangeCheckBox = () => setIsChecked(v => !v);

  return (
    <>
      <MetaTitle content="수업 생성" />

      <Wrapper>
        <Breadcrumb />

        <section>
          <Title>수업명</Title>
          <TextInput placeholder="새로운 수업" />
        </section>
        <section>
          <Title>수업 설명</Title>
          <TextInput placeholder="새로운 수업 설명" />
        </section>
        <section>
          <Title>개설학기</Title>
          <TextInput placeholder="2022년 1학기" />
        </section>
        <section>
          <Title>담당 교수</Title>
          <TextInput placeholder="홍길동" />
        </section>
        <section>
          <Title>분반 활성화</Title>
          <CheckBox
            label="class-activate"
            message=""
            checked={isChecked}
            onChange={onChangeCheckBox}
          />
        </section>
      </Wrapper>
    </>
  );
};

ClassCreatePage.getLayout = page => {
  return (
    <Layout isSide>
      <Sidebar />
      {page}
    </Layout>
  );
};

const Wrapper = styled(DashboardLayout)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 8px;

  & > section {
    margin-bottom: 32px;
  }
`;

const Title = styled.h1`
  margin-bottom: 16px;
  ${typo.headline1};
`;

export default ClassCreatePage;

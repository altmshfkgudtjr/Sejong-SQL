import styled, { useTheme } from 'styled-components';
import { useState, useRef } from 'react';
// components
import { Icon } from 'sjds/components/icons';
import TextInput from 'components/atoms/inputs/Text';
import { TextButton, FillButton } from 'sjds/components/buttons';
import RadioButton from 'components/atoms/inputs/RadioButton';
// hooks
import useSnackbar from 'hooks/dom/useSnackbar';
import * as useEnvironmentController from 'hooks/controllers/useEnvironmentController';
// utils
import { uploadFile } from 'utils/helpers/file';
import { createFormdata } from 'utils/helpers/formdata';
// styles
import { typo } from 'sjds';

/** 가상 데이터베이스 선택 모달 - 생성 */
const EnvModalNew = ({ onPrev, args }) => {
  const { classId } = args;

  const nameRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);

  const currentTheme = useTheme();
  const { initSnackbar } = useSnackbar();

  const { refetch: envRefetch } = useEnvironmentController.GetClassEnvList(classId);
  const { refetch: myEnvRefetch } = useEnvironmentController.GetMyEnvList();
  const { mutate: uploadMutate } = useEnvironmentController.CreateEnv();

  const onUpload = () => {
    const callback = e => {
      const sqlFile = e.target.files[0];
      setFile(sqlFile);
      if (nameRef.current && !nameRef.current.value) {
        nameRef.current.value = sqlFile.name.slice(0, -4);
      }
    };

    uploadFile({
      accept: '.sql',
      callback,
    });
  };

  const onSubmit = () => {
    if (!file) {
      initSnackbar({
        type: 'Warning',
        title: 'WARNING',
        message: 'SQL 파일을 업로드해주세요',
      });
      return;
    }

    if (nameRef.current?.value.length === 0) {
      initSnackbar({
        type: 'Warning',
        title: 'WARNING',
        message: '가상 데이터베이스 이름을 작성해주세요',
      });
      nameRef.current.focus();
      return;
    }

    uploadMutate(
      {
        data: createFormdata({
          class_id: classId,
          name: nameRef.current?.value,
          file,
        }),
      },
      {
        onSuccess: () => {
          envRefetch();
          myEnvRefetch();
          onPrev();
        },
      },
    );
  };

  return (
    <Wrapper>
      <Header>
        <div>
          <BackButton onClick={onPrev} size="ExtraSmall">
            <Icon name="ic_arrow_left" width={24} height={24} stroke={currentTheme.text.f2} />
          </BackButton>
          <Title>새로운 가상 데이터베이스</Title>
        </div>
        <div>
          <TextButton onClick={onSubmit} size="ExtraSmall" color={currentTheme.semantic.info}>
            생성하기
          </TextButton>
        </div>
      </Header>

      <Section>
        <SectionTitle>이름</SectionTitle>
        <TextInput ref={nameRef} type="text" placeholder="가상 데이터베이스 이름" />
      </Section>

      <Section>
        <SectionTitle>테이블 업로드</SectionTitle>
        <FillButton onClick={onUpload} size="Small" color={currentTheme.primary}>
          SQL 파일 임포트
        </FillButton>
        {!!file && (
          <UploadedFile>
            <RadioButton name="info_1" label="info_1" checked readOnly />
            {file.name}
          </UploadedFile>
        )}
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.section``;

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

const BackButton = styled(TextButton)`
  width: 36px;
`;

const Title = styled.h1`
  ${typo.headline1};
  color: ${({ theme }) => theme.text.f2};
`;

const Section = styled.div`
  padding: 0 20px;
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 16px;
  ${typo.subtitle1};
  color: ${({ theme }) => theme.text.f2};
`;

const UploadedFile = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  margin-top: 16px;
  ${typo.subvalue1};
  color: ${({ theme }) => theme.text.f2};
`;

export default EnvModalNew;

import styled, { useTheme } from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
// components
import { Icon } from 'sjds/components/icons';
import { TextButton } from 'sjds/components/buttons';
import SideLayout from 'components/layouts/Side';
import SidebarBadge from 'components/presenters/sidebar/Badge';
import SidebarClassToggle from 'components/presenters/sidebar/ClassToggle';
import WeekButton from 'components/presenters/sidebar/WeekButton';
// hooks
import * as useUserController from 'hooks/controllers/useUserController';
import * as useClassController from 'hooks/controllers/useClassController';
// styles
import { animations } from 'sjds';
// types
import { MyClass } from 'types/api/class';

/** 사이드바 */
const Sidebar = () => {
  const { query } = useRouter();
  const classId = parseInt(query.classId as string, 10);
  const weekId = parseInt(query.weekId as string, 10);
  const currentTheme = useTheme();

  const { data: profileData } = useUserController.GetProfile();
  const { status, data: classData, refetch: classListRefetch } = useClassController.GetClassList();
  const { mutate: removeMutate } = useClassController.DeleteClass();
  const classList = classData?.result as MyClass[];

  const onDeleteClass = (classId: number) => {
    const res = confirm('정말로 제거하시겠습니까?');
    if (res) {
      removeMutate(
        { classId },
        {
          onSuccess: () => {
            classListRefetch();
          },
        },
      );
    }
  };

  const StudentClassList = classList
    ?.filter(cl => cl.type === 'st')
    .map(cl => (
      <ClassWrapper key={cl.id}>
        <SidebarClassToggle
          open={classId === cl.id}
          classId={`${cl.id}`}
          name={cl.name}
          managerName={cl.prof.name}
        >
          {cl.pgroup.map(week => (
            <WeekButton
              key={week.id}
              selected={week.id === weekId}
              classId={cl.id}
              weekId={week.id}
              name={week.name}
            />
          ))}
        </SidebarClassToggle>
      </ClassWrapper>
    ));

  const ManagerClassList = classList
    ?.filter(cl => cl.type !== 'st')
    .map(cl => (
      <ClassWrapper key={cl.id}>
        <SidebarClassToggle
          open={classId === cl.id}
          classId={`${cl.id}`}
          name={cl.name}
          managerName={cl.prof.name}
        >
          {cl.pgroup.map(week => (
            <WeekButton
              key={week.id}
              selected={week.id === weekId}
              classId={cl.id}
              weekId={week.id}
              name={week.name}
            />
          ))}
        </SidebarClassToggle>
        <ButtonWrapper>
          <Link href={`/dashboard/${cl.id}/member/manage`} passHref>
            <ManageButton as="a" size="ExtraSmall" color={currentTheme.semantic.info}>
              학생 관리
            </ManageButton>
          </Link>
          <ManageButton
            size="ExtraSmall"
            color={currentTheme.semantic.danger}
            onClick={() => onDeleteClass(cl.id)}
          >
            수업 제거
          </ManageButton>
        </ButtonWrapper>
      </ClassWrapper>
    ));

  return (
    <SideLayout>
      {status === 'success' && (
        <WrapperWithAnime>
          {StudentClassList.length > 0 && (
            <CategoryWrapper>
              <SidebarBadge>
                <Icon name="ic_class" width={16} height={16} fill={currentTheme.text.f4} />
                수업
              </SidebarBadge>
              {StudentClassList}
            </CategoryWrapper>
          )}

          {ManagerClassList.length > 0 && (
            <CategoryWrapper>
              <SidebarBadge>
                <Icon name="ic_setting" width={16} height={16} fill={currentTheme.text.f4} />
                관리
              </SidebarBadge>
              {ManagerClassList}
            </CategoryWrapper>
          )}

          {profileData?.result?.role === 'sa' && (
            <Link href="/dashboard/class/new" passHref>
              <CreateClassButton as="a" size="Regular">
                <Icon
                  name="ic_folder_add"
                  width={16}
                  height={16}
                  fill={currentTheme.semantic.info}
                />
                수업 추가하기
              </CreateClassButton>
            </Link>
          )}
        </WrapperWithAnime>
      )}
    </SideLayout>
  );
};

const WrapperWithAnime = styled.div`
  animation: 0.4s ease ${animations.fadeIn};
`;

const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ClassWrapper = styled.div`
  margin-bottom: 16px;
`;

const CreateClassButton = styled(TextButton)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  border-radius: 0;
  color: ${({ theme }) => theme.semantic.info};

  &::before {
    border-radius: 0;
  }
`;

const ManageButton = styled(TextButton)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
  border-radius: 0;

  &::before {
    border-radius: 0;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${ManageButton} {
    flex: 1;
    justify-content: center;
  }
`;

export default Sidebar;

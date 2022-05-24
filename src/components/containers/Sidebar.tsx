import styled, { useTheme } from 'styled-components';
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
  const currentTheme = useTheme();

  const { status, data } = useClassController.GetClassList();
  const { data: profileData } = useUserController.GetProfile();
  const classList = data?.result as MyClass[];

  const StudentClassList = classList
    ?.filter(cl => cl.type === 'st')
    .map(cl => (
      <ClassWrapper key={cl.id}>
        <SidebarClassToggle classId={`${cl.id}`} name={cl.name} managerName={cl.prof}>
          {cl.pgroup.map(week => (
            <WeekButton key={week.id} classId={cl.id} weekId={week.id} name={week.name} />
          ))}
        </SidebarClassToggle>
      </ClassWrapper>
    ));

  const ManagerClassList = classList
    ?.filter(cl => cl.type !== 'st')
    .map(cl => (
      <ClassWrapper key={cl.id}>
        <SidebarClassToggle classId={`${cl.id}`} name={cl.name} managerName={cl.prof}>
          {cl.pgroup.map(week => (
            <WeekButton key={week.id} classId={cl.id} weekId={week.id} name={week.name} />
          ))}
        </SidebarClassToggle>
        <Link href={`/dashboard/${cl.id}/member/manage`} passHref>
          <ManageButton as="a" size="ExtraSmall" color={currentTheme.semantic.info}>
            학생 관리
          </ManageButton>
        </Link>
        <ManageButton size="ExtraSmall" color={currentTheme.semantic.danger}>
          수업 제거
        </ManageButton>
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
`;

const ManageButton = styled(TextButton)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
  border-radius: 0;
`;

export default Sidebar;

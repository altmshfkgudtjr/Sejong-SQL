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
import * as useClassController from 'hooks/controllers/useClassController';
// types
import { MyClass } from 'types/api/class';

/** 사이드바 */
const Sidebar = () => {
  const currentTheme = useTheme();

  const { status, data } = useClassController.GetClass();
  const classList = data?.result as MyClass[];

  const isAdmin = true;

  const StudentClassList = classList
    ?.filter(cl => true)
    .map(cl => (
      <ClassWrapper key={cl.id}>
        <SidebarClassToggle classId={`${cl.id}`} name={cl.name} managerName={cl.prof}>
          <WeekButton classId={`${cl.id}`} weekId="1" name="1주차" />
          <WeekButton classId={`${cl.id}`} weekId="2" name="2주차" />
          <WeekButton classId={`${cl.id}`} weekId="2" name="2주차" />
        </SidebarClassToggle>
      </ClassWrapper>
    ));

  const ManagerClassList = classList
    ?.filter(cl => true)
    .map(cl => (
      <ClassWrapper key={cl.id}>
        <SidebarClassToggle classId={`${cl.id}`} name={cl.name} managerName={cl.prof}>
          <WeekButton classId={`${cl.id}`} weekId="1" name="1주차" />
          <WeekButton classId={`${cl.id}`} weekId="2" name="2주차" />
          <WeekButton classId={`${cl.id}`} weekId="3" name="3주차" />
          <WeekButton classId={`${cl.id}`} weekId="4" name="4주차" />
        </SidebarClassToggle>
      </ClassWrapper>
    ));

  return (
    <SideLayout>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'success' && (
        <>
          <CategoryWrapper>
            <SidebarBadge>
              <Icon name="ic_class" width={16} height={16} fill={currentTheme.text.f4} />
              수업
            </SidebarBadge>

            {StudentClassList}
          </CategoryWrapper>

          <CategoryWrapper>
            <SidebarBadge>
              <Icon name="ic_setting" width={16} height={16} fill={currentTheme.text.f4} />
              관리
            </SidebarBadge>

            {ManagerClassList}
          </CategoryWrapper>
        </>
      )}

      {isAdmin && (
        <Link href="/dashboard/class/new" passHref>
          <CreateClassButton as="a" size="Regular">
            <Icon name="ic_folder_add" width={16} height={16} fill={currentTheme.semantic.info} />
            수업 추가하기
          </CreateClassButton>
        </Link>
      )}
    </SideLayout>
  );
};

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

export default Sidebar;

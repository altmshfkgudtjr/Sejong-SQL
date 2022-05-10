import styled, { useTheme } from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/router';
// components
import SideLayout from 'components/layouts/Side';
import { Icon } from 'sjds/components/icons';
import SidebarBadge from 'components/presenters/sidebar/Badge';
import SidebarClassToggle from 'components/presenters/sidebar/ClassToggle';
import WeekButton from 'components/presenters/sidebar/WeekButton';

/** 사이드바 */
const Sidebar = () => {
  const { query } = useRouter();
  const classId = query.classId as string;
  const currentTheme = useTheme();

  const [isLoaded] = useState(true);

  return (
    <SideLayout>
      {!isLoaded && <div>Loading...</div>}
      {isLoaded && (
        <>
          <CategoryWrapper>
            <ClassWrapper>
              <SidebarBadge>
                <Icon name="ic_class" width={16} height={16} fill={currentTheme.text.f4} />
                수업
              </SidebarBadge>

              <SidebarClassToggle name="데이터베이스" managerName="신희재">
                <WeekButton classId={classId} weekId="1" name="1주차" />
                <WeekButton classId={classId} weekId="2" name="2주차" />
                <WeekButton classId={classId} weekId="3" name="3주차" />
                <WeekButton classId={classId} weekId="4" name="4주차" />
              </SidebarClassToggle>
            </ClassWrapper>

            <ClassWrapper>
              <SidebarClassToggle name="연습문제" managerName="신희재"></SidebarClassToggle>
            </ClassWrapper>
          </CategoryWrapper>

          <CategoryWrapper>
            <ClassWrapper>
              <SidebarBadge>
                <Icon name="ic_setting" width={16} height={16} fill={currentTheme.text.f4} />
                관리
              </SidebarBadge>

              <SidebarClassToggle name="데이터베이스 실습" managerName="서정민">
                <WeekButton classId={classId} weekId="1" name="연습문제" />
                <WeekButton classId={classId} weekId="2" name="1주차 - 원하는 데이터 선택" />
                <WeekButton classId={classId} weekId="3" name="2주차 - 원하는 조건문 추가" />
                <WeekButton classId={classId} weekId="4" name="3주차 - 데이터베이스의 꽃, JOIN문" />
              </SidebarClassToggle>
            </ClassWrapper>
          </CategoryWrapper>
        </>
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

export default Sidebar;
